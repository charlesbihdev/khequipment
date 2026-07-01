import type { ReactNode } from 'react';

export function AdminTable({ children }: { children: ReactNode }) {
    return (
        <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-sm">{children}</table>
            </div>
        </div>
    );
}

export function EmptyTableRow({ colSpan, label }: { colSpan: number; label: string }) {
    return (
        <tr>
            <td colSpan={colSpan} className="px-4 py-10 text-center text-muted-foreground">
                {label}
            </td>
        </tr>
    );
}
