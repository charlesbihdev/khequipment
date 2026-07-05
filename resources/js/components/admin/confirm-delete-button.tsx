import { router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import type { RouteFormDefinition } from '@/wayfinder';

type Props = {
    form: RouteFormDefinition<'post'>;
    label?: string;
    title?: string;
    description?: string;
};

export function ConfirmDeleteButton({
    form,
    label = 'Delete',
    title = 'Delete this item?',
    description = 'This action cannot be undone.',
}: Props) {
    const [open, setOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    function confirmDelete() {
        router.visit(form.action, {
            method: form.method,
            onStart: () => setDeleting(true),
            onSuccess: () => setOpen(false),
            onFinish: () => setDeleting(false),
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="destructive" type="button">
                    {label}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            disabled={deleting}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        variant="destructive"
                        disabled={deleting}
                        onClick={confirmDelete}
                    >
                        {deleting && <LoaderCircle className="animate-spin" />}
                        {label}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
