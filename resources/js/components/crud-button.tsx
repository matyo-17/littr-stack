import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { LoaderCircle, Save, X } from "lucide-react";

interface CrudButtonProps {
    url: string;
    processing: boolean;
}

export default function CrudButton({ url, processing }: CrudButtonProps) {
    return (
        <div className="grid grid-cols-2 gap-2">
            <Button 
                type="button" variant="destructive" 
                onClick={() => router.visit(url)}
            >
                <X />
                Cancel
            </Button>
            <Button
                type="submit" disabled={processing}
            >
                {processing 
                    ? <LoaderCircle className="h-4 w-4 animate-spin" />
                    : <Save className="h-4 w-4" />}
                Save
            </Button>
        </div>
    )
}
