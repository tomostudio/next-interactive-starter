# Guide: Web Component (`components/`)

## Kontrak Folder

✅ Boleh:

- Terima props, render JSX
- `useState`, `useEffect` untuk local UI state
- Import dari `utils/`, `hooks/`, `constants/`

❌ Dilarang:

- Panggil `axios` atau `fetch` langsung
- Import data-fetching hooks dari `hooks/`
- Hardcode API URL atau query key
- Business logic

---

## Struktur Folder

Semua komponen flat di `components/` — tidak ada subfolder.

```
components/
├── atoms/
│   ├── button.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── status-badge.tsx
│   └── loading-spinner.tsx
│
├── molecules/
│   ├── select.tsx
│   ├── radio-group.tsx
│   └── actions-dropdown.tsx
│
├── organisms/
│   ├── dialog.tsx
│   ├── sheet.tsx
│   ├── table.tsx
│   └── panel-card.tsx
│
├── templates/
│   ├── panel-layout.tsx       → layout halaman panel: sidebar, header, content area
│   ├── list-page-template.tsx → template halaman listing: title, filter, table, pagination
│   └── form-page-template.tsx → template halaman form: header, form content, action footer
│
└── index.ts
```

---

## Tipe Komponen

### 1. Wrapper (primitif + project props)

```tsx
// components/atoms/button.tsx
"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: "primary" | "warning" | "danger" | "secondary";
  size?: "small" | "medium" | "large";
  rounded?: "default" | "large" | "full";
  loading?: boolean;
  textOnly?: boolean;
  leftIcon?: React.ReactNode;
}

export function Button({
  intent = "primary",
  loading,
  leftIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button disabled={disabled || loading} {...props}>
      {loading ? <Spinner /> : leftIcon}
      {children}
    </button>
  );
}
```

```tsx
// components/atoms/input.tsx
"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  intent?: "default" | "clean";
  rounded?: "default" | "large";
}

export function Input({ label, error, leftIcon, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            {leftIcon}
          </span>
        )}
        <input className={leftIcon ? "pl-10" : ""} {...props} />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
```

### 2. Composite (gabungan beberapa elemen)

```tsx
// components/molecules/actions-dropdown.tsx
"use client";

interface Action {
  label: string;
  onClick: () => void;
  destructive?: boolean;
}

export function ActionsDropdown({ actions }: { actions: Action[] }) {
  // dropdown menu dengan daftar actions
}
```

```tsx
// components/atoms/status-badge.tsx
interface StatusBadgeProps {
  status: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
}

export function StatusBadge({
  status,
  activeLabel = "Active",
  inactiveLabel = "Inactive",
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        status ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
      }`}
    >
      {status ? activeLabel : inactiveLabel}
    </span>
  );
}
```

---

## Kapan Taruh di Mana

| Kondisi                        | Lokasi               |
| ------------------------------ | -------------------- |
| Komponen hanya dipakai 1 route | `app/**/components/` |
| Komponen dipakai >1 route      | `components/`        |

---

## Aturan Tambahan

- Satu file = satu komponen utama
- Export named — bukan default export
- Selalu forward HTML props asli (`...props`) di wrapper
- File diakhiri newline (EOF)
