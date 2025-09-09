import Heading from "@/components/heading";

interface FormLayoutProps {
    title: string;
    children: React.ReactNode;
}

export default function FormLayout({
    title,
    children
}: FormLayoutProps) {
    return (
        <>
            <Heading title={title} />

            <div className="flex-1 md:max-w-2xl">
                <section className="max-w-xl space-y-12">
                    {children}
                </section>
            </div>
        </>
    );
}
