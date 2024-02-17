import { useActivateEmployee } from "./useActivateEmployee.hook";
import { useBlockEmployee } from "./useBlockEmployee.hook";

export const useEmployeeStateChanger = () => {

    const activate = useActivateEmployee();
    const blocker = useBlockEmployee();

    return {
        activate,
        blocker,
    }
}