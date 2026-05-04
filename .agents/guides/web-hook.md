# Guide: Web Hook (`hooks/`)

## Kontrak Folder

✅ Boleh:

- Wrap `useQuery`, `useMutation` dari react-query
- Panggil `axios` instance **langsung** di hook (tidak perlu service function terpisah)
- Return data, loading state, error state, dan mutation handlers

❌ Dilarang:

- Berisi JSX atau render logic
- Satu hook untuk semua operasi — pisah per file
- Hardcode URL — gunakan `apiRouters` dari constants
- Gunakan `any` sebagai type

---

## Konvensi

### Struktur Folder

```
hooks/
├── use-transactions-data-table.ts  → fetch paginated transaction list
├── use-transaction-get-one.ts      → fetch single transaction by id
├── use-transaction-insert-one.ts   → create transaction mutation
├── use-transaction-update-one.ts   → update transaction mutation
├── use-transaction-delete-one.ts   → delete transaction mutation
├── use-query-param.ts              → wrap searchParams + router
└── index.ts                        → re-export semua hooks
```

### Penamaan (Wajib Ikuti)

| Operasi                 | Hook           | File                |
| ----------------------- | -------------- | ------------------- |
| Fetch list + pagination | `useDataTable` | `use-data-table.ts` |
| Fetch single by ID      | `useGetOne`    | `use-get-one.ts`    |
| Create                  | `useInsertOne` | `use-insert-one.ts` |
| Update                  | `useUpdateOne` | `use-update-one.ts` |
| Delete                  | `useDeleteOne` | `use-delete-one.ts` |

Export alias dengan nama domain: `usePaymentMethodsDataTable`, `usePaymentMethodsInsertOne`, dll.

---

### `useDataTable` — React-Query Hook untuk Paginated List

`useDataTable` adalah **react-query `useQuery` hook** yang mem-fetch paginated data dari API.
Bukan TanStack Table wrapper.

```typescript
// hooks/use-data-table.ts
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import type { PaymentMethodResponseProps as DataTypeProps } from "@vibecoding-starter/types/payment-method-response";
import { axios } from "$/services/axios";
import { apiRouters, queryKeys } from "$/constants";
import { DataTableResponse, ErrorResponse } from "$/types/generals";
import { AxiosError } from "axios";

const DEFAULT_LIMIT = 10;

type DataTableFilterProps = {
  search?: string;
  isActive?: boolean;
};

type UseDataTableProps = {
  isAutoFetch?: boolean;
  key?: string;
  page?: number;
  filter?: DataTableFilterProps;
  limit?: number;
};

type DataTableQueryKey = [
  string,
  { page: number; limit: number; filter?: DataTableFilterProps },
];

const fetchDataTable = async (
  args: QueryFunctionContext<DataTableQueryKey>,
) => {
  const [, { page, limit, filter }] = args.queryKey;

  const result = await axios<DataTableResponse<DataTypeProps>>({
    method: "GET",
    url: apiRouters.paymentMethods.index,
    params: {
      ...filter,
      search: filter?.search?.trim() || undefined,
      page,
      limit,
    },
  });

  return result;
};

const useDataTable = (args?: UseDataTableProps) => {
  const {
    key = queryKeys.paymentMethods.index,
    page = 1,
    filter,
    limit = DEFAULT_LIMIT,
    isAutoFetch,
  } = args || {};

  const dataTable = useQuery<
    DataTableResponse<DataTypeProps>,
    ErrorResponse<AxiosError>,
    DataTableResponse<DataTypeProps>,
    DataTableQueryKey
  >({
    queryKey: [key, { page, limit, filter }],
    enabled: isAutoFetch,
    queryFn: fetchDataTable,
  });

  return {
    limit,
    refetch: dataTable.refetch,
    data: dataTable.data?.list,
    pagination: dataTable.data?.meta.pagination,
    error: dataTable.error,
    isLoading: dataTable.isLoading,
  };
};

export default useDataTable;
export { useDataTable as usePaymentMethodsDataTable };
```

**Cara pakai di content:**

### `index.ts` — Re-export

```typescript
// hooks/transactions/use-payment-methods/index.ts
export { default as usePaymentMethodsDataTable } from "./use-data-table";
export { default as usePaymentMethodsGetOne } from "./use-get-one";
export { default as usePaymentMethodsInsertOne } from "./use-insert-one";
export { default as usePaymentMethodsUpdateOne } from "./use-update-one";
export { default as usePaymentMethodsDeleteOne } from "./use-delete-one";
```

## Aturan Tambahan

- Satu file = satu hook
- Nama file = kebab-case dari nama hook
- Default export + named export alias setiap hook file
- File diakhiri newline
