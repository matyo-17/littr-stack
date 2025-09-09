import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Trash2 } from "lucide-react";
import { SheetAction } from "@/types";
import { FormEventHandler } from "react";

interface ConfirmDeleteProps {
    action: SheetAction;
    onOpenChange: () => void;
    submit: FormEventHandler;
    processing: boolean;
}

export function ConfirmDelete({
    action,
    onOpenChange,
    submit,
    processing
}: ConfirmDeleteProps) {
    return (
        <Dialog open={action == 'delete'} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Delete?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete the record from our server.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:space-x-0">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={submit}
                        disabled={processing}
                    >
                        {processing 
                            ? <LoaderCircle className="h-4 w-4 animate-spin" />
                            : <Trash2 />}
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}