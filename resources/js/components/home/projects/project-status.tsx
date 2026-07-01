type ProjectStatusProps = {
    category: string;
};

function labelForCategory(category: string) {
    return category
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function ProjectStatus({ category }: ProjectStatusProps) {
    return (
        <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-brand-gold px-3 py-1 text-xs font-black tracking-wide text-brand-gold-foreground uppercase">
                {labelForCategory(category)}
            </span>
        </div>
    );
}
