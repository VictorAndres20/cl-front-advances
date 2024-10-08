import { TableColumnsType } from "antd";
import { BasicDatatable } from "../../../widgets /antd_table/basic_datatable";
import { useBasicTableSearchBox } from "../../../widgets /antd_table/useBasicTableSearchBox.hook";
import { Messages } from "../../../_events/messages/type";
import { useAllMessages } from "../../../_hooks/messages/use-all-messages.hook";
import FormModal from "./form_modal";

export default function Table(){

    const dataHook = useAllMessages();
    const searchBox = useBasicTableSearchBox<Messages>();
    
    const columns: TableColumnsType<Messages> = [
        {
            title: 'Tipo',
            dataIndex: 'cod',
            key: 'cod',
            width: '20%',
            render: (text: string, param: Messages, key: number) => (
                <span key={`cod_message_${key}`}>
                    {
                        param.cod === 'ADVA' ? 'Mensaje de confirmación'
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
        {
            title: 'Acciones',
            dataIndex: 'uuid',
            key: 'uuid',
            width: '10%',
            render: (text: string, param: Messages, key: number) => (
                <FormModal key={`form_edit_${key}`} id={param.cod} reload={dataHook.loadData} />
            )
        },
    ];

    return(
        <div style={{ width: '100%' }}>
            <BasicDatatable columns={columns} data={dataHook.data} pagination={true} />
        </div>
    );
}