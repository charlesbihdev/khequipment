type ProjectDetailBlockProps = {
    label: string;
    children: React.ReactNode;
};

export function ProjectDetailBlock({
    label,
    children,
}: ProjectDetailBlockProps) {
    return (
        <div className="rounded-md border border-border bg-card p-4">
            <p className="text-xs font-black tracking-wide text-brand-gold uppercase">
                {label}
            </p>
            <div className="mt-2 text-base font-bold text-foreground">
                {children}
            </div>
        </div>
    );
}
