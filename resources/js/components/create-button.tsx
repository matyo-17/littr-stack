import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreateButtonProps {
    create: () => void;
}

export default function CreateButton({ create }: CreateButtonProps) {
    return (
        <Button size="sm" onClick={create}>
            <CirclePlus />
            Create
        </Button>
    )
}