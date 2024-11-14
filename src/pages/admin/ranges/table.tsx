import { Button, Popconfirm, TableColumnsType } from "antd";
import { BasicDatatable } from "../../../widgets /antd_table/basic_datatable";
import { useBasicTableSearchBox } from "../../../widgets /antd_table/useBasicTableSearchBox.hook";
import FormModal from "./form_modal";
import { RangeType } from "../../../_events/range/type";
import { getCompany, getRol } from "../../../_utils/storage_handler";
import { useRangesByRol } from "../../../_hooks/range/use-ranges-by-rol.hook";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useRangeStateChanger } from "../../../_hooks/enterprise/use-range-state-changer.hook";

export default function Table(){

    const dataHook = useRangesByRol(getRol() ?? '', getCompany());
    const searchBox = useBasicTableSearchBox<RangeType>();
    const stateChanger = useRangeStateChanger();
    
    const columns: TableColumnsType<RangeType> = [
        {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
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
            title: 'Tope',
            dataIndex: 'money_limit',
            key: 'money_limit',
            width: '5%',
            ...searchBox.getColumnSearchProps('money_limit'),
        },
        {
            title: 'Montos',
            dataIndex: 'amounts',
            key: 'amounts',
            width: '10%',
            render: (text: string, param: RangeType, key: number) => (
                <ul key={`amounts_range_${key}`}>
                    { 
                        param.amounts &&
                        param.amounts.map((amount, key) => {
                            return(
                                <li key={`li_amount_${key}`}>
                                    {amount.value} ({amount.cost})
                                </li>
                            );
                        })
                    }
                </ul>
            )
        },
        {
            title: 'Acciones',
            dataIndex: 'uuid',
            key: 'uuid',
            width: '5%',
            render: (text: string, param: RangeType, key: number) => (
                <div  key={`edit_range_${key}`} className="flex-row">
                    <FormModal key={`edit_range_${key}`} id={param.uuid} reload={() => dataHook.loadData(getCompany())} />
                    {
                        param.active === 1 ?
                        <Popconfirm
                            title='Eliminar rango'
                            description='¿Estás seguro de eliminar este rango? Los montos del rango también serán elminados'
                            onConfirm={() => stateChanger.blocker.block(param.uuid, () => dataHook.loadData(getCompany()))}
                        >
                            <Button style={{ margin: '0 20px' }} danger shape="circle" icon={<CloseCircleOutlined />} />
                        </Popconfirm>
                        :
                        <Button onClick={() => stateChanger.activate.activate(param.uuid, () => dataHook.loadData(getCompany()))} style={{ margin: '0 20px' }}  type="primary" shape="circle" icon={<CheckCircleOutlined />} />
                    }
                </div>
            )
        },
    ];

    return(
        <div style={{ width: '100%' }}>
            <div style={{ width: '90%', display: 'flex', flexDirection: 'row-reverse', marginBottom: '10px' }}>
                <FormModal reload={() => dataHook.loadData(getCompany())} />
            </div>
            <BasicDatatable columns={columns} data={dataHook.data} pagination={true} />
        </div>
    );
}