import { useFindAllEnterprises } from "../../../_hooks/enterprise/useFindAllEnterprises.hook";
import { BasicDatatable } from "../../../widgets /antd_table/basic_datatable";
import { useBasicTableSearchBox } from "../../../widgets /antd_table/useBasicTableSearchBox.hook";
import FormModal from "./form_modal";

export default function Table(){

    const dataHook = useFindAllEnterprises();
    const searchBox = useBasicTableSearchBox();
    
    const columns = [
        {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...searchBox.getColumnSearchProps('name'),
        },
        {
        title: 'Dirección',
        dataIndex: 'address',
        key: 'address',
        width: '20%',
        ...searchBox.getColumnSearchProps('address'),
        },
        {
            title: 'Acciones',
            dataIndex: 'uuid',
            key: 'uuid',
            width: '10%',
            render: (text, param, key) => (
                <FormModal key={`form_edit_enterprise_${key}`} id={param.id} reload={dataHook.loadData} />
            )
        },
    ];

    return(
        <div style={{ width: '100%' }}>
            <div style={{ width: '90%', display: 'flex', flexDirection: 'row-reverse' }}>
                <FormModal reload={dataHook.loadData} />
            </div>
            <BasicDatatable columns={columns} data={dataHook.data} pagination={true} />
        </div>
    );
}