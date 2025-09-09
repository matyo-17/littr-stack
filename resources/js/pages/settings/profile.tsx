import Heading from "@/components/heading";
import InputError from "@/components/input-error";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInitials } from "@/hooks";
import SettingsLayout from "@/layouts/settings-layout";
import { BreadcrumbItem, SharedData } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";

type ProfileForm = {
    name: string;
    avatar: File | null;
};

export default function Profile() {
    const getInitials = useInitials();

    const { auth } = usePage<SharedData>().props;

    const { data, setData, post, processing, errors, reset } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        avatar: null,
    });

    const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | undefined>(undefined);

    const avatarInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files ? e.target.files[0] : null
        setData('avatar', file);

        const previewUrl = file ? URL.createObjectURL(file) : undefined;
        setAvatarPreviewUrl(previewUrl);
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('profile.update'), {
            onFinish: () => {
                reset('avatar');
                if (avatarInputRef.current) {
                    avatarInputRef.current.value = '';
                    setAvatarPreviewUrl(undefined);
                }
            },
        });
    }

    return (
        <SettingsLayout>
            <Heading title="Profile information" size="sm" />

            <form onSubmit={submit}>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={auth.user.email}
                            readOnly
                        />
                    </div>

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

                    <div className="grid grid-cols-5 items-center gap-4">
                        <div className="col-span-4">
                            <Label htmlFor="avatar">Avatar</Label>
                            <Input
                                id="avatar"
                                type="file"
                                ref={avatarInputRef}
                                onChange={handleAvatarChange}
                                accept="image/*"
                            />
                            <InputError message={errors.avatar} />
                        </div>
                        <div className="col-span-1 flex items-center justify-center">
                            <Avatar className="size-10">
                                <AvatarImage src={avatarPreviewUrl} alt="avatar" />
                                <AvatarFallback>{getInitials(data.name)}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Save
                        </Button>
                    </div>                
                </div>
            </form>
        </SettingsLayout>
    );
}

Profile.breadcrumbs = [
    {
        title: 'Profile Settings',
        href: route('profile.edit'),
    },
] as BreadcrumbItem[];
