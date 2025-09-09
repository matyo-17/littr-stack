import FormSheet from "@/components/form-sheet";
import InputError from "@/components/input-error";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SheetProps } from "@/types";
import { useEffect, useMemo, useState } from "react";

interface RoleSheetProps extends SheetProps {
    permissions: Record<string, Record<string, string>>;
}

export default function RoleSheet({
    permissions,
    action, onOpenChange,
    data, setData,
    submit, processing, errors,
}: RoleSheetProps) {
    const [checkAll, setCheckAll] = useState<boolean>(false);
    const permissionList = useMemo(() => {
        return Object.values(permissions).flatMap((group) => Object.keys(group));
    }, [permissions]);

    useEffect(() => {
        setCheckAll(data.permissions.length === permissionList.length);
    }, [data.permissions])

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
                <Label>Permissions</Label>
                <div className="flex gap-2 items-center">
                    <Checkbox
                        id="check-all"
                        value="all"
                        checked={checkAll}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                setData('permissions', permissionList);
                            } else {
                                setData('permissions', []);
                            }
                        }}
                    />
                    <Label className="font-normal" htmlFor="check-all">All</Label>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {Object.entries(permissions).map(([group, permissionList]) => {
                        return (
                            <div className="flex flex-col gap-2" key={group}>
                                <Label className="text-xs underline">{group.toUpperCase()}</Label>
                                <div className="grid gap-2">
                                    {Object.entries(permissionList).map(([id, name]) => {
                                        return (
                                            <div className="flex gap-2 items-center" key={name}>
                                                <Checkbox
                                                    value={id} id={name}
                                                    checked={data.permissions.includes(id)}
                                                    onCheckedChange={(checked) => {
                                                        setData('permissions', checked
                                                            ? [...data.permissions, id]
                                                            : data.permissions.filter((p: string) => p !== id)
                                                        );
                                                    }}
                                                />
                                                <Label className="font-normal" htmlFor={name}>{name}</Label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </FormSheet>
    );
}
