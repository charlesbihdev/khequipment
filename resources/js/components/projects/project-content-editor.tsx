import { SimpleEditor } from '@/components/tiptap/templates/simple/simple-editor';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type ProjectContentEditorProps = {
    value: string;
    onChange: (html: string) => void;
    error?: string;
    label?: string;
    placeholder?: string;
};

export function ProjectContentEditor({
    value,
    onChange,
    error,
    label = 'Content',
    placeholder = 'Write the project, contract, or service details...',
}: ProjectContentEditorProps) {
    return (
        <div className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
                <Label>{label}</Label>
                {value && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onChange('')}
                    >
                        Reset content
                    </Button>
                )}
            </div>

            <SimpleEditor
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />

            <InputError message={error} />
        </div>
    );
}
