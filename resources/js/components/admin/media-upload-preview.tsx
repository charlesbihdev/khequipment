import { ImagePlus, Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type PreviewFile = {
    id: string;
    url: string;
    name: string;
    type: string;
    file?: File;
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
    const displayType = preview?.type.startsWith('video/')
        ? 'video'
        : currentType;

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview.url);
        };
    }, [preview]);

    function selectFile(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] ?? null;
        if (preview) URL.revokeObjectURL(preview.url);
        setPreview(
            file
                ? {
                      id: crypto.randomUUID(),
                      url: URL.createObjectURL(file),
                      name: file.name,
                      type: file.type,
                      file,
                  }
                : null,
        );
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
                        <video
                            src={displayUrl}
                            controls
                            className="aspect-video w-full object-contain"
                        />
                    ) : (
                        <img
                            src={displayUrl}
                            alt=""
                            className="h-40 w-full object-contain"
                        />
                    )}
                    {preview && (
                        <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            onClick={clearFile}
                            className="absolute top-2 right-2 size-7 rounded-full"
                        >
                            <X className="size-3.5" />
                        </Button>
                    )}
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="flex h-28 flex-col items-center justify-center gap-2 rounded-md border border-dashed bg-muted/30 text-sm text-muted-foreground transition hover:border-brand-gold hover:text-brand-steel"
                >
                    <Upload className="size-5" />
                    <span className="font-medium">Click to upload</span>
                </button>
            )}
            <Input
                ref={inputRef}
                id={id}
                name={name}
                type="file"
                accept={accept}
                required={required}
                onChange={selectFile}
                className={displayUrl ? '' : 'hidden'}
            />
        </div>
    );
}

type MultiProps = {
    id: string;
    name: string;
    accept?: string;
};

export function MultiImageUploadPreview({
    id,
    name,
    accept = 'image/*',
}: MultiProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previews, setPreviews] = useState<PreviewFile[]>([]);

    const previewsRef = useRef<PreviewFile[]>([]);

    useEffect(() => {
        previewsRef.current = previews;
    }, [previews]);

    useEffect(() => {
        return () => {
            previewsRef.current.forEach((preview) =>
                URL.revokeObjectURL(preview.url),
            );
        };
    }, []);

    function syncInputFiles(nextPreviews: PreviewFile[]) {
        if (!inputRef.current) return;

        const dataTransfer = new DataTransfer();
        nextPreviews.forEach((preview) => {
            if (preview.file) dataTransfer.items.add(preview.file);
        });
        inputRef.current.files = dataTransfer.files;
    }

    function selectFiles(event: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(event.target.files ?? []);
        const nextPreviews = [
            ...previews,
            ...files.map((file) => ({
                id: crypto.randomUUID(),
                url: URL.createObjectURL(file),
                name: file.name,
                type: file.type,
                file,
            })),
        ];

        setPreviews(nextPreviews);
        syncInputFiles(nextPreviews);
    }

    function removeFile(id: string) {
        const preview = previews.find((item) => item.id === id);
        if (preview) URL.revokeObjectURL(preview.url);

        const nextPreviews = previews.filter((item) => item.id !== id);
        setPreviews(nextPreviews);
        syncInputFiles(nextPreviews);
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
                    <div
                        key={preview.id}
                        className="relative h-20 w-20 shrink-0"
                    >
                        <img
                            src={preview.url}
                            alt={preview.name}
                            className="size-full rounded-md border bg-white object-cover"
                        />
                        {index === 0 && (
                            <span className="absolute top-1 left-1 rounded bg-black/70 px-1 py-0.5 text-[9px] font-bold text-white">
                                Main
                            </span>
                        )}
                        <button
                            type="button"
                            aria-label={`Remove ${preview.name}`}
                            onClick={() => removeFile(preview.id)}
                            className="absolute top-1 right-1 inline-flex size-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm transition hover:bg-destructive/90"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-md border border-dashed bg-muted/30 text-muted-foreground transition hover:border-brand-gold hover:text-brand-steel"
                >
                    <ImagePlus className="size-5" />
                    <span className="text-[10px] font-medium">Add photo</span>
                </button>
                {previews.length > 0 && (
                    <button
                        type="button"
                        onClick={clearFiles}
                        className="flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-md border border-dashed border-destructive/40 text-destructive transition hover:bg-destructive/5"
                    >
                        <X className="size-5" />
                        <span className="text-[10px] font-medium">Clear</span>
                    </button>
                )}
            </div>
            <Input
                ref={inputRef}
                id={id}
                name={name}
                type="file"
                multiple
                accept={accept}
                onChange={selectFiles}
                className="hidden"
            />
        </div>
    );
}
