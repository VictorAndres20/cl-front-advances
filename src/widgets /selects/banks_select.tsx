import { useAllBanks } from "../../_hooks/bank/use-all-banks";
import SearchSelect from "./search_select";

export default function BanksSelect({ value, onChange }: { value: string, onChange: ((value: string | undefined) => void) }) {

    const dataHook = useAllBanks();

    return(
        <SearchSelect 
            options={ dataHook.data.map( e => ({ value: e.cod, label: `${e.name}` }) ) }
            placeholder="Banco"
            value={ value }
            onChange={(id) => {
                onChange(id);
            }}
        />
    );
}