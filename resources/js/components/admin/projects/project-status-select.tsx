import { RequiredLabel } from '@/components/admin/required-label';
import InputError from '@/components/input-error';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export const PROJECT_STATUS_OPTIONS = [
    { value: 'planned', label: 'Planned' },
    { value: 'in_progress', label: 'In progress' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'on_hold', label: 'On hold' },
];

type ProjectStatusSelectProps = {
    value: string;
    error?: string;
    onChange: (value: string) => void;
};

export function ProjectStatusSelect({
    value,
    error,
    onChange,
}: ProjectStatusSelectProps) {
    return (
        <div className="grid gap-2">
            <RequiredLabel htmlFor="status">Status</RequiredLabel>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Choose status" />
                </SelectTrigger>
                <SelectContent>
                    {PROJECT_STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <InputError message={error} />
        </div>
    );
}
