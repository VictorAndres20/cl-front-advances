import { useAllBankAccountType } from "../../_hooks/bank_account_type/use-all-bank-account-type.hook";
import SearchSelect from "./search_select";

export default function BanksAccountTypeSelect({ value, onChange }: { value: string, onChange: ((value: string | undefined) => void) }) {

    const dataHook = useAllBankAccountType();

    return(
        <SearchSelect 
            options={ dataHook.data.map( e => ({ value: e.cod, label: `${e.name}` }) ) }
            placeholder="Tipo de cuenta"
            value={ value }
            onChange={(id) => {
                onChange(id);
            }}
        />
    );
}