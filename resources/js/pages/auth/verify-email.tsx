import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/auth-layout";
import { useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { FormEventHandler } from "react";

interface VerifyEmailProps {
    status?: string;
}

const VerifyEmail = ({ status }: VerifyEmailProps) => {
    const { post, processing } = useForm();
    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    }

    return (
        <>
            {(status === 'verification-link-sent') && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    We have emailed your verification link.
                </div>)}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Resend verification email
                </Button>
            </form>
        </>
    );
}

VerifyEmail.layout = (page: React.ReactElement) => (
    <AuthLayout title="Verify Email">
        {page}
    </AuthLayout>
);

export default VerifyEmail;
