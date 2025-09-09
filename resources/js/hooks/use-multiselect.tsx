import { Option } from "@/types";

export function useMultiselect() {
    function multiselectOptions<T extends Record<string, string>>(
        optionList: T[], 
        value: keyof T,
        key: keyof T = "id"
    ): Option[] {
        return optionList.map((option) => ({
            label: option[value],
            value: String(option[key])
        }));
    }

    return {
        multiselectOptions,
    };
}
