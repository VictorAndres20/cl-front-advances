import { useRetireEmployee } from "./use-retire-employee";
import { useUnretireEmployee } from "./use-unretire-employee";


export const useUpdateRetireEmployee = () => {

    const retire = useRetireEmployee();
    const unretire = useUnretireEmployee();

    return {
        retire,
        unretire,
    }
}