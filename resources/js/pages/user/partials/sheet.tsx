import FormSheet from "@/components/form-sheet";
import { Selections, SheetProps } from "@/types";
import InputError from "@/components/input-error";
import { MultiSelect } from "@/components/multi-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMultiselect } from "@/hooks";

interface UserSheetProps extends SheetProps {
    roles: Selections;
}

export default function UserSheet({
    roles,
    action, onOpenChange,
    data, setData,
    submit, processing, errors,
}: UserSheetProps) {
    const { multiselectOptions } = useMultiselect();

    return (
        <FormSheet
            title="user"
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
                    readOnly
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    readOnly
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="roles">Roles</Label>
                <MultiSelect
                    options={multiselectOptions(roles, 'name')}
                    onValueChange={(e) => setData('roles', e)}
                    defaultValue={data.roles}
                    placeholder="Roles"
                    hideSelectAll={true}
                    modalPopover={true}
                />
                <InputError message={errors.roles} />
            </div>
        </FormSheet>
    )
}
