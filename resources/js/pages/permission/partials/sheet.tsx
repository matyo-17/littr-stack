import FormSheet from "@/components/form-sheet";
import InputError from "@/components/input-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetProps } from "@/types";

interface PermissionSheetProps extends SheetProps {}

export default function PermissionSheet({
    action, onOpenChange,
    data, setData,
    submit, processing, errors,
}: PermissionSheetProps) {
    return (
        <FormSheet
            title="role"
            action={action}
            onOpenChange={onOpenChange}
            submit={submit}
            processing={processing}
        >
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                />
                <InputError message={errors.name} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="group">Group</Label>
                <Input
                    id="group"
                    type="text"
                    value={data.group}
                    onChange={(e) => setData('group', e.target.value)}
                />
                <InputError message={errors.group} />
            </div>
        </FormSheet>
    );
}
