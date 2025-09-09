import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";
import { useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler, ReactElement } from "react";

type ForgotPasswordForm = {
    email: string;
};

interface ForgotPasswordProps {
    status?: string;
}

const ForgotPassword = ({ status }: ForgotPasswordProps) => {
    const { data, setData, post, processing, errors } = useForm<Required<ForgotPasswordForm>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    }

    return (
        <>
            {(status === 'password-reset-link-sent') && (<div className="mb-4 text-center text-sm font-medium text-green-600">
                We have emailed your password reset link.
            </div>)}

            <form onSubmit={submit}>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} />
                    </div>
                
                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Email password reset link
                    </Button>
                </div>
            </form>
        </>
    );
}

ForgotPassword.layout = (page: ReactElement) => (
    <AuthLayout title="Forgot Password">
        {page}
    </AuthLayout>
);

export default ForgotPassword;
