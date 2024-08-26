import { useRangesByRol } from "../../_hooks/range/use-ranges-by-rol.hook";
import { getCompany, getRol } from "../../_utils/storage_handler";
import SearchSelect from "./search_select";

export default function RangeEnterpriseSelect({ value, onChange }: { value: string, onChange: ((value: string | undefined) => void) }) {

    const dataHook = useRangesByRol(getRol() ?? '', getCompany());

    return(
        <SearchSelect 
            options={ dataHook.data.map( e => ({ value: e.uuid, label: `${e.id}${typeof e.enterprise === 'object' && ` (${e.enterprise?.name})`}` }) ) }
            placeholder="Rango"
            value={ value }
            onChange={(id) => {
                onChange(id);
            }}
        />
    );
}