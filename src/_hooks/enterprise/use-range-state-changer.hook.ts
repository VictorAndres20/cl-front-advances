import { useActivateRange } from "../range/use-active-range.hook";
import { useBlockRange } from "../range/use-block-range.hook";

export const useRangeStateChanger = () => {

    const activate = useActivateRange();
    const blocker = useBlockRange();

    return {
        activate,
        blocker,
    }
}