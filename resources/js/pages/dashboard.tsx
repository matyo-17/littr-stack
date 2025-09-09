import Heading from "@/components/heading";
import { BreadcrumbItem } from "@/types";

export default function Dashboard() {
    return (
        <>
            <Heading title="Dashboard" />
        </>
    );
}

Dashboard.breadcrumbs = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
] as BreadcrumbItem[];
