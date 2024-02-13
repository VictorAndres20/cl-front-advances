import { TableColumnsType } from "antd";
import { BasicDatatable } from "../../../widgets /antd_table/basic_datatable";
import { useBasicTableSearchBox } from "../../../widgets /antd_table/useBasicTableSearchBox.hook";
import FormModal from "./form_modal";
import { useFindAllAmountsByEnterprise } from "../../../_hooks/amount/useFindAllAmountsByEnterprise.hook";
import { getCompany } from "../../../_utils/storage_handler";
import { Amount } from "../../../_events/amount/type";
import BasicBadge from "../../../widgets /badges/basic_badge";

export default function Table(){

    const dataHook = useFindAllAmountsByEnterprise(getCompany());
    const searchBox = useBasicTableSearchBox<Amount>();
    
    const columns: TableColumnsType<Amount> = [
        {
            title: 'Rango',
            dataIndex: 'range',
            key: 'range',
            width: '20%',
            render: (text: string, param: Amount, key: number) => (
                <span key={`range_amount_${key}`}>{typeof param.range === 'object' ? param.range.id : 'NA'}</span>
            )
        },
        {
            title: 'Valor',
            dataIndex: 'value',
            key: 'value',
            width: '30%',
            ...searchBox.getColumnSearchProps('value'),
        },
        {
            title: 'Costo',
            dataIndex: 'cost',
            key: 'cost',
            width: '30%',
            ...searchBox.getColumnSearchProps('cost'),
            },
        {
            title: 'Empresa',
            dataIndex: 'enterprise',
            key: 'enterprise',
            width: '20%',
            render: (text: string, param: Amount, key: number) => (
                <span key={`amount_active_${key}`}>{param.active === 1 ? <BasicBadge text="Activo" color="success" /> : <BasicBadge text="Inactivo" color="danger" />}</span>
            )
        },
        {
            title: 'Acciones',
            dataIndex: 'uuid',
            key: 'uuid',
            width: '10%',
            render: (text: string, param: Amount, key: number) => (
                <FormModal key={`edit_range_${key}`} id={param.uuid} reload={() => dataHook.loadData(getCompany())} />
            )
        },
    ];

    return(
        <div style={{ width: '100%' }}>
            <div style={{ width: '90%', display: 'flex', flexDirection: 'row-reverse' }}>
                <FormModal reload={() => dataHook.loadData(getCompany())} />
            </div>
            <BasicDatatable columns={columns} data={dataHook.data} pagination={true} />
        </div>
    );
}