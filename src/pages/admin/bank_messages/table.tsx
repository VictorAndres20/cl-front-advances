import { TableColumnsType } from "antd";
import { BasicDatatable } from "../../../widgets /antd_table/basic_datatable";
import { useBasicTableSearchBox } from "../../../widgets /antd_table/useBasicTableSearchBox.hook";
import { BankMessages } from "../../../_events/bank_messages/type";
import { useAllBankMessages } from "../../../_hooks/bank_messages/use-all-bank-messages.hook";

export default function Table(){

    const dataHook = useAllBankMessages();
    const searchBox = useBasicTableSearchBox<BankMessages>();
    
    const columns: TableColumnsType<BankMessages> = [
        {
            title: 'Tipo',
            dataIndex: 'cod',
            key: 'cod',
            width: '20%',
            render: (text: string, param: BankMessages, key: number) => (
                <span key={`cod_message_${key}`}>
                    {
                        param.bank && typeof param.bank === 'object' ? param.bank?.name
                        :
                        ''
                    }
                </span>
            )
        },
        {
            title: 'Mensaje',
            dataIndex: 'message',
            key: 'message',
            width: '80%',
            ...searchBox.getColumnSearchProps('message'),
        },
    ];

    return(
        <div style={{ width: '100%' }}>
            <BasicDatatable columns={columns} data={dataHook.data} pagination={true} />
        </div>
    );
}