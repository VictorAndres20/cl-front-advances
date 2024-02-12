import { TableColumnsType } from "antd";
import { useFindAllRange } from "../../../_hooks/range/useFindAllRange.hook";
import { BasicDatatable } from "../../../widgets /antd_table/basic_datatable";
import { useBasicTableSearchBox } from "../../../widgets /antd_table/useBasicTableSearchBox.hook";
import FormModal from "./form_modal";
import { RangeType } from "../../../_events/range/type";

export default function Table(){

    const dataHook = useFindAllRange();
    const searchBox = useBasicTableSearchBox<RangeType>();
    
    const columns: TableColumnsType<RangeType> = [
        {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        width: '30%',
        ...searchBox.getColumnSearchProps('id'),
        },
        {
        title: 'Empresa',
        dataIndex: 'enterprise',
        key: 'enterprise',
        width: '20%',
        render: (text: string, param: RangeType, key: number) => (
            <span key={`range_enterprise_${key}`}>{typeof param.enterprise === 'object' ? param.enterprise.name : 'NA'}</span>
        )
        },
        {
            title: 'Acciones',
            dataIndex: 'uuid',
            key: 'uuid',
            width: '10%',
            render: (text: string, param: RangeType, key: number) => (
                <FormModal key={`edit_range_${key}`} id={param.uuid} reload={dataHook.loadData} />
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