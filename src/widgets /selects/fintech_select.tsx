import { useAllFintech } from "../../_hooks/fintech/use-all-fintech.hook";
import SearchSelect from "./search_select";

export default function FintechSelect({ value, onChange }: { value: string, onChange: ((value: string | undefined) => void) }) {

    const dataHook = useAllFintech();

    return(
        <SearchSelect 
            options={ dataHook.data.map( e => ({ value: e.cod, label: `${e.name}` }) ) }
            placeholder="Plataforma financiera"
            value={ value }
            onChange={(id) => {
                onChange(id);
            }}
        />
    );
}