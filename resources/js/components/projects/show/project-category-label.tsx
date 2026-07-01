type ProjectCategoryLabelProps = {
    category: string;
};

export function ProjectCategoryLabel({ category }: ProjectCategoryLabelProps) {
    const label = category
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

    return (
        <span className="rounded-md bg-brand-gold px-3 py-1 text-xs font-black tracking-wide text-brand-gold-foreground uppercase">
            {label}
        </span>
    );
}
