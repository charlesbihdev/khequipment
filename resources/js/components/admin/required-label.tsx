import { Label } from '@/components/ui/label';

type Props = {
    htmlFor?: string;
    children: React.ReactNode;
};

export function RequiredLabel({ htmlFor, children }: Props) {
    return (
        <Label htmlFor={htmlFor}>
            {children} <span className="text-destructive">*</span>
        </Label>
    );
}
