import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Pen, Trash2 } from "lucide-react";

interface DataTableCellAction {
    canUpdate?: boolean;
    canDelete?: boolean;
    edit?: () => void;
    confirmDelete?: () => void;
}

export function DataTableCellAction({
    canUpdate = false,
    canDelete = false,
    edit,
    confirmDelete
}: DataTableCellAction) {
    return (
        <div className="flex items-center justify-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        aria-label="Open menu"
                        variant="ghost"
                        className="flex size-8 p-0 data-[state=open]:bg-muted"
                    >
                        <Ellipsis className="size-4" aria-hidden="true" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    {canUpdate && 
                        <DropdownMenuItem
                            onClick={edit}
                        >
                            <Pen />
                            Edit
                        </DropdownMenuItem>
                    }
                    {canDelete &&
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={confirmDelete}
                        >
                            <Trash2 />
                            Delete
                        </DropdownMenuItem>
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}