import { RequiredLabel } from '@/components/admin/required-label';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ProjectFieldProps = {
    name: string;
    label: string;
    value: string;
    error?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
    onChange: (value: string) => void;
};

export function ProjectField(props: ProjectFieldProps) {
    return (
        <div className="grid gap-2">
            {props.required ? (
                <RequiredLabel htmlFor={props.name}>
                    {props.label}
                </RequiredLabel>
            ) : (
                <Label htmlFor={props.name}>{props.label}</Label>
            )}
            <Input
                id={props.name}
                type={props.type ?? 'text'}
                value={props.value}
                placeholder={props.placeholder}
                required={props.required}
                onChange={(event) => props.onChange(event.target.value)}
            />
            <InputError message={props.error} />
        </div>
    );
}
