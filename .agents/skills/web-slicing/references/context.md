# Context: Web Slicing

## Folder Target

```
apps/web/
├── app/                  → page.tsx + *-content.tsx
└── components/           → reusable UI (jika perlu share antar halaman)
```

## Struktur Halaman (WAJIB)

```
app/(group)/[feature]/
├── page.tsx               → Server Component, Suspense wrapper saja
└── [feature]-content.tsx  → Client Component, semua logic di sini
```

**Tidak ada** `_components/` subfolder. Dialog, form, table — semua inline di content file.

## Contoh Kode Nyata

### Example 1 — CRUD Basic (Template)
Lokasi: `.agents/examples/web-slicing/nextjs-app-router/examples/`

Pattern: useDataTable + useQueryParam + debounce + SweetAlert preConfirm + ActionsDropdown

File:
- `page.tsx` — Suspense wrapper
- `examples-content.tsx` — semua logic: list, search, form dialog, delete confirm

**Gunakan untuk:** halaman CRUD dengan field sederhana.

---

### Example 2 — CRUD dengan Form Kompleks (REFERENSI UTAMA)
Lokasi: `.agents/examples/web-slicing/nextjs-app-router/payment-methods/`

Pattern: useDataTable + useQueryParam + debounce + SweetAlert preConfirm + Select component + RadioGroup + form dengan watch/setValue

File:
- `page.tsx` — Suspense wrapper
- `payment-methods-content.tsx` — **Baca ini dulu** untuk pola lengkap

**Gunakan untuk:** halaman dengan form kompleks (Select, RadioGroup, banyak field).

---

## Pattern Penting

### `page.tsx` — Suspense Wrapper

```tsx
import { Suspense } from 'react'
import FeatureContent from './feature-content'
import { LoadingSpinner } from '$/components/loading-spinner'

export default function FeaturePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <FeatureContent />
    </Suspense>
  )
}
```

### Search dengan `useQueryParam` + `debounce`

```tsx
const [tempQuery, setTempQuery] = useState(currentSearch)
const { setQueryParams } = useQueryParam()

const debouncedSearch = useMemo(
  () => debounce((value: string) => {
    setQueryParams({ q: value.trim() || undefined, page: 1 })
  }, 250),
  [setQueryParams],
)

const handleOnSearch = (e) => {
  setTempQuery(e.target.value)
  debouncedSearch(e.target.value)
}
```

### SweetAlert Delete — `preConfirm` + Promise

```tsx
const handleOnDelete = (id: string) => {
  Swal.fire({
    text: 'Apakah yakin menghapus data ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e42c2c',
    cancelButtonColor: '#3278A0',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal',
    preConfirm: () => {
      Swal.showLoading()
      return new Promise((resolve, reject) => {
        deleteMutate(id, {
          onSuccess: () => resolve(null),
          onError: () => reject(),
        })
      })
    },
    didOpen: () => {
      Swal.getCancelButton()!.style.order = '-1'
    },
  })
    .then((result) => {
      if (result.isConfirmed) {
        toast.success('Data deleted successfully!')
        setQueryParams({ page: 1 })
        refetch()
      }
    })
    .catch(() => {
      Swal.hideLoading()
      Swal.close()
      toast.error('Failed to delete data. Please try again.')
    })
}
```

### Table + Pagination

```tsx
<PanelCard>
  <Table
    data={items || []}
    columns={columns}
    intent="clean"
    isLoading={isLoading}
    isShowPagination={true}
    pagination={{
      page: currentPage,
      limit: limit,
      totalData: paginationData?.total || 0,
      onPageClick(newPage) { setQueryParams({ page: newPage }) },
    }}
  />
</PanelCard>
```

### ActionsDropdown

```tsx
<ActionsDropdown
  actions={[
    { label: 'Edit', onClick: () => handleOpenDialog(true, row) },
    { label: 'Delete', onClick: () => handleOnDelete(row.id), destructive: true },
  ]}
/>
```

## Teknologi yang Dipakai

| Teknologi | Kegunaan |
|-----------|---------|
| Next.js App Router | Routing, layout, page |
| Tailwind CSS | Styling |
| react-hook-form + zodResolver | Form state + validasi |
| SweetAlert2 | Konfirmasi delete |
| react-hot-toast | Notifikasi sukses/error |
| Lucide React | Icons |
| useQueryParam | Filter & pagination di URL |
| debounce utility | Debounce search input |
