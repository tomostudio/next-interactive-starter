# Guide: Web Util (`utils/`)

## Kontrak Folder

✅ Boleh:

- Pure functions tanpa side effect
- Format, transform, parse helper yang FE-specific

❌ Dilarang:

- Axios atau fetch call
- Import React hooks di sini — pindah ke `hooks/`
- State management
- Business logic yang berubah sesuai requirement

---

## Konvensi

### `debounce` — Utility dengan `.cancel()`

```typescript
// utils/debounce.ts
type DebouncedFn<T extends (...args: unknown[]) => unknown> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): DebouncedFn<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced;
}
```

**Cara pakai dengan `useMemo`:**

```tsx
const debouncedSearch = useMemo(
  () =>
    debounce((value: string) => {
      setQueryParams({ q: value || undefined, page: 1 });
    }, 250),
  [setQueryParams],
);

// Cleanup saat unmount
useEffect(() => {
  return () => debouncedSearch.cancel();
}, [debouncedSearch]);
```

### `pathVariable` — URL Path Builder

```typescript
// utils/path-variable.ts
export function pathVariable<T extends Record<string, string>>(
  url: string,
  params: T,
): string {
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, value),
    url,
  );
}
```

**Cara pakai:**

```typescript
pathVariable("/payment-methods/:id", { id: "123" });
// → '/payment-methods/123'

pathVariable("/vendors/:vendorId/drivers/:id", { vendorId: "v1", id: "d1" });
// → '/vendors/v1/drivers/d1'
```

### Format Currency

```typescript
// utils/format-currency.ts
export function formatCurrency(amount: number, currency = "IDR"): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}
```

---

## Aturan Tambahan

- Satu fungsi per file, atau group fungsi terkait dalam satu file
- Tidak perlu class — gunakan fungsi biasa
- File diakhiri newline
