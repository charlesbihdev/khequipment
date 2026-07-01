import type { ReactNode } from 'react';

export function AdminFormShell({ children }: { children: ReactNode }) {
    return (
        <div className="rounded-lg border bg-card p-5 shadow-sm">
            <div className="grid gap-5">{children}</div>
        </div>
    );
}
