import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";

export function AppLogo() {
    const { appIcon, appName } = usePage<SharedData>().props;

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md">
                <img src={appIcon} />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">{appName}</span>
            </div>
        </>
    )
}
