# Context: API Feature

## Folder Target

```
apps/api/src/
├── application/
│   ├── dtos/             → {Domain}Dto.ts
│   ├── validators/       → {domain}.schemas.ts
│   └── services/         → {Domain}Service.ts
├── domain/
│   ├── entities/         → {Domain}.ts
│   ├── repositories/     → I{Domain}Repository.ts
│   └── use-cases/        → {verb}-{domain}.ts
├── infrastructure/
│   └── database/         → Prisma{Domain}Repository.ts
└── interfaces/http/
    ├── controllers/      → {Domain}Controller.ts
    └── routes/           → {domain}Routes.ts
```

## Pattern per Layer

### Entity
```typescript
export type User = {
  id: string
  name: string
  email: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Repository Interface
```typescript
export interface IUserRepository {
  findById(id: string): Promise<User | null>
  findAll(filter: UserListFilter): Promise<{ data: User[]; total: number }>
  create(input: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>
  update(id: string, input: Partial<User>): Promise<User>
  delete(id: string): Promise<void>
}
```

### Use Case
```typescript
export async function createUser(repo: IUserRepository, input: CreateInput) {
  const exists = await repo.findByEmail(input.email)
  if (exists) throw new DomainError('CONFLICT', 'Email already exists')
  return repo.create(input)
}
```

### Service
```typescript
export class UserService {
  constructor(private readonly repo: IUserRepository) {}
  async create(payload: CreateUserPayload): Promise<UserDto> {
    const user = await createUser(this.repo, payload)
    return toUserDto(user)
  }
}
```

### Controller
```typescript
export class UserController {
  constructor(private readonly service: UserService) {}
  create = async (c: Context) => {
    const body = await c.req.json()
    const result = await this.service.create(body)
    return c.json(result, 201)
  }
}
```

### Route
```typescript
const repo = new PrismaUserRepository()
const service = new UserService(repo)
const controller = new UserController(service)

export const userRoutes = new Hono()
  .use(authMiddleware)
  .post('/', zValidator('json', createUserSchema), controller.create)
  .get('/', controller.list)
  .get('/:id', controller.getById)
  .put('/:id', zValidator('json', updateUserSchema), controller.update)
  .delete('/:id', controller.delete)
```
