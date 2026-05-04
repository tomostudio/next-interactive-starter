# Context: DB Prisma Schema

## Folder Target

```
apps/api/
└── prisma/
    └── schema.prisma
```

## Pattern Model Lengkap

```prisma
model MasterServiceType {
  id          String    @id @default(uuid()) @db.Uuid
  name        String    @db.VarChar(100)
  code        String    @unique @db.VarChar(50)
  isActive    Boolean   @default(true) @map("is_active")
  createdAt   DateTime  @default(now()) @map("created_at") @db.Timestamp(6)
  updatedAt   DateTime  @default(now()) @map("updated_at") @db.Timestamp(6)
  deletedAt   DateTime? @map("deleted_at") @db.Timestamp(6)

  @@map("master_service_types")
}
```

## Pattern Relasi

```prisma
model BusinessShipment {
  id            String            @id @default(uuid()) @db.Uuid
  userId        String            @map("user_id") @db.Uuid
  serviceTypeId String            @map("service_type_id") @db.Uuid

  user        User              @relation(fields: [userId], references: [id])
  serviceType MasterServiceType @relation(fields: [serviceTypeId], references: [id])

  @@index([userId])
  @@map("business_shipments")
}
```

## Pattern Enum

```prisma
enum ShipmentStatus {
  PENDING
  IN_TRANSIT
  DELIVERED
  CANCELLED

  @@map("shipment_status")
}
```

## Commands

```bash
bunx prisma validate --schema prisma/schema.prisma
bunx prisma format --schema prisma/schema.prisma
bunx prisma generate --schema prisma/schema.prisma
bunx prisma migrate dev --schema prisma/schema.prisma --name <migration_name>
```
