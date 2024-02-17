import { useFindAllUserRoles } from "../../_hooks/user_rol/useFindAllUserRoles.hook";
import SearchSelect from "./search_select";

export default function UserRolSelect({ value, onChange }: { value: string, onChange: ((value?: string | null) => void) }) {

    const dataHook = useFindAllUserRoles();

    return(
        <SearchSelect
            options={ dataHook.data.map( e => ({ value: e.cod, label: `${e.name}` }) ) }
            placeholder="Rol"
            value={ value }
            onChange={(id) => {
                onChange(id);
            }}
        />
    );
}