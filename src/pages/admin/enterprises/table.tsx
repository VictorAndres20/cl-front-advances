import { Button, Popconfirm, Spin, TableColumnsType } from "antd";
import { EnterpriseType } from "../../../_events/enterprise/type";
import { useFindAllEnterprises } from "../../../_hooks/enterprise/useFindAllEnterprises.hook";
import { BasicDatatable } from "../../../widgets /antd_table/basic_datatable";
import { useBasicTableSearchBox } from "../../../widgets /antd_table/useBasicTableSearchBox.hook";
import FormModal from "./form_modal";
import { useResetLimitDateEnterprise } from "../../../_hooks/enterprise/use-reset-limit-date-enterprise.hook";
import { ReloadOutlined } from "@ant-design/icons";
import { buildTZDate } from "../../../_utils/dateFormat";

export default function Table(){

    const dataHook = useFindAllEnterprises();
    const searchBox = useBasicTableSearchBox<EnterpriseType>();
    const resetLimitDateHook = useResetLimitDateEnterprise(dataHook.loadData);
    
    const columns: TableColumnsType<EnterpriseType> = [
        {
            title: 'NIT',
            dataIndex: 'nit',
            key: 'nit',
            width: '15%',
            ...searchBox.getColumnSearchProps('nit'),
            },
        {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
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
            title: 'Fecha de tope',
            dataIndex: 'date_limit',
            key: 'date_limit',
            width: '20%',
            render: (_text: string, param: EnterpriseType, key: number) => (
                <span key={`date_limit_${key}`}>{buildTZDate(param.date_limit)}</span>
            )
            },
        {
            title: 'Acciones',
            dataIndex: 'uuid',
            key: 'uuid',
            width: '10%',
            render: (_text: string, param: EnterpriseType, key: number) => (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FormModal key={`form_edit_enterprise_${key}`} id={param.id} reload={dataHook.loadData} />
                    {
                        resetLimitDateHook.loading ? 
                        <Spin /> 
                        :
                        <Popconfirm
                            title='Reestablecer fecha de tope'
                            description='La fecha de tope de este cliente se reestablecerá al día de hoy. De esta manera se habilitarán ciertos montos a los empleados para generar anticipos más grandes.'
                            onConfirm={() => {
                                resetLimitDateHook.resetLimitDate(param.id ?? 0)
                            }}
                        >
                            <Button danger style={{ marginLeft: '5px' }}>Actualizar fecha de tope <ReloadOutlined /></Button>
                        </Popconfirm> 
                    }
                </div>
            )
        },
    ];

    return(
        <div style={{ width: '100%' }}>
            <div style={{ width: '90%', display: 'flex', flexDirection: 'row-reverse', marginBottom: '10px' }}>
                <FormModal reload={dataHook.loadData} />
            </div>
            <BasicDatatable columns={columns} data={dataHook.data} pagination={true} />
        </div>
    );
}