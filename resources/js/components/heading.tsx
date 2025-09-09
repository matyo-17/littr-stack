interface HeadingProps {
    title: string;
    description?: string;
    size?: 'sm' | 'md';
}

export default function Heading({ title, description, size='md' }: HeadingProps) {
    return (
        <div className="mb-8 space-y-0.5">
            {size == 'md'
                ? <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                : <h3 className="mb-0.5 text-base font-medium">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
    );
}
