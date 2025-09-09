import { TypographyH1, TypographyLead } from "@/components/typography";
import { Button } from "@/components/ui/button";
import ErrorLayout from "@/layouts/error-layout";
import { router } from "@inertiajs/react";
import { ReactElement } from "react";

interface ErrorPageProps {
    status: number;
}

const ErrorPage = ({ status }: ErrorPageProps) => {
    const descriptionMap: Record<number, string> = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    };

    const description: string = descriptionMap[status];

    const goHome = () => {
        router.visit(route('index'));
    }

    return (
        <div className="flex flex-col justify-center items-center gap-3">
            <TypographyH1>{status}</TypographyH1>
            <TypographyLead>{description}</TypographyLead>
            
            <Button onClick={goHome} className="w-fit">
                Go to Homepage
            </Button>
        </div>
    )
}

ErrorPage.layout = (page: ReactElement) => (
    <ErrorLayout>
        {page}
    </ErrorLayout>
);

export default ErrorPage;
