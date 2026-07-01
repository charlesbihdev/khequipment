import { ImagePlus, Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type PreviewFile = {
    url: string;
    name: string;
    type: string;
};

type SingleProps = {
    id: string;
    name?: string;
    accept: string;
    required?: boolean;
    currentUrl?: string | null;
    currentType?: 'image' | 'video';
    onFileChange?: (file: File | null) => void;
};

export function SingleMediaUploadPreview({
    id,
    name,
    accept,
    required,
    currentUrl,
    currentType = 'image',
    onFileChange,
}: SingleProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<PreviewFile | null>(null);
    const displayUrl = preview?.url ?? currentUrl ?? null;
    const displayType = preview?.type.startsWith('video/') ? 'video' : currentType;

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview.url);
        };
    }, [preview]);

    function selectFile(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] ?? null;
        if (preview) URL.revokeObjectURL(preview.url);
        setPreview(file ? { url: URL.createObjectURL(file), name: file.name, type: file.type } : null);
        onFileChange?.(file);
    }

    function clearFile() {
        if (preview) URL.revokeObjectURL(preview.url);
        setPreview(null);
        if (inputRef.current) inputRef.current.value = '';
        onFileChange?.(null);
    }

    return (
        <div className="grid gap-2">
            {displayUrl ? (
                <div className="relative overflow-hidden rounded-md border bg-white">
                    {displayType === 'video' ? (
                        <video src={displayUrl} controls className="aspect-video w-full object-contain" />
                    ) : (
                        <img src={displayUrl} alt="" className="h-40 w-full object-contain" />
                    )}
                    {preview && (
                        <Button type="button" size="icon" variant="destructive" onClick={clearFile} className="absolute right-2 top-2 size-7 rounded-full">
                            <X className="size-3.5" />
                        </Button>
                    )}
                </div>
            ) : (
                <button type="button" onClick={() => inputRef.current?.click()} className="flex h-28 flex-col items-center justify-center gap-2 rounded-md border border-dashed bg-muted/30 text-sm text-muted-foreground transition hover:border-brand-gold hover:text-brand-steel">
                    <Upload className="size-5" />
                    <span className="font-medium">Click to upload</span>
                </button>
            )}
            <Input ref={inputRef} id={id} name={name} type="file" accept={accept} required={required} onChange={selectFile} className={displayUrl ? '' : 'hidden'} />
        </div>
    );
}

type MultiProps = {
    id: string;
    name: string;
    accept?: string;
};

export function MultiImageUploadPreview({ id, name, accept = 'image/*' }: MultiProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previews, setPreviews] = useState<PreviewFile[]>([]);

    useEffect(() => {
        return () => previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    }, [previews]);

    function selectFiles(event: React.ChangeEvent<HTMLInputElement>) {
        previews.forEach((preview) => URL.revokeObjectURL(preview.url));
        const files = Array.from(event.target.files ?? []);
        setPreviews(files.map((file) => ({ url: URL.createObjectURL(file), name: file.name, type: file.type })));
    }

    function clearFiles() {
        previews.forEach((preview) => URL.revokeObjectURL(preview.url));
        setPreviews([]);
        if (inputRef.current) inputRef.current.value = '';
    }

    return (
        <div className="grid gap-2">
            <div className="flex flex-wrap gap-2">
                {previews.map((preview, index) => (
                    <div key={preview.url} className="relative h-20 w-20 shrink-0">
                        <img src={preview.url} alt={preview.name} className="size-full rounded-md border bg-white object-cover" />
                        {index === 0 && <span className="absolute left-1 top-1 rounded bg-black/70 px-1 py-0.5 text-[9px] font-bold text-white">Main</span>}
                    </div>
                ))}
                <button type="button" onClick={() => inputRef.current?.click()} className="flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-md border border-dashed bg-muted/30 text-muted-foreground transition hover:border-brand-gold hover:text-brand-steel">
                    <ImagePlus className="size-5" />
                    <span className="text-[10px] font-medium">Add photo</span>
                </button>
                {previews.length > 0 && (
                    <button type="button" onClick={clearFiles} className="flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-md border border-dashed border-destructive/40 text-destructive transition hover:bg-destructive/5">
                        <X className="size-5" />
                        <span className="text-[10px] font-medium">Clear</span>
                    </button>
                )}
            </div>
            <Input ref={inputRef} id={id} name={name} type="file" multiple accept={accept} onChange={selectFiles} className="hidden" />
        </div>
    );
}
