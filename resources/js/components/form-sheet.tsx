import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FormEventHandler, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Save, X } from "lucide-react";

interface FormSheetProps {
    title: string;
    action: string;
    onOpenChange: () => void;
    submit: FormEventHandler;
    processing: boolean;
    children: ReactNode;
}

export default function FormSheet({
    title,
    action,
    onOpenChange,
    submit,
    processing,
    children
}: FormSheetProps) {
    const open = action == 'store' || action == 'update';

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="flex flex-col gap-6 w-4/5 md:max-w-md lg:max-w-lg xl:max-w-xl">
                <SheetHeader className="text-left">
                    <SheetTitle>{title.toUpperCase()}</SheetTitle>
                </SheetHeader>

                <form className="flex flex-col gap-5 px-4 h-full overflow-auto" onSubmit={submit}>
                    {children}

                    <SheetFooter>
                        <SheetClose asChild>
                            <Button variant="destructive">
                                <X />
                                Close
                            </Button>
                        </SheetClose>
                        <Button type="submit" disabled={processing}>
                            {processing 
                                ? <LoaderCircle className="h-4 w-4 animate-spin" />
                                : <Save />}
                            Save
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}
