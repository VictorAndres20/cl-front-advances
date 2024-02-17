import { Button, TableColumnsType } from "antd";
import { BasicDatatable } from "../../../widgets /antd_table/basic_datatable";
import { useBasicTableSearchBox } from "../../../widgets /antd_table/useBasicTableSearchBox.hook";
import { getCompany } from "../../../_utils/storage_handler";
import BasicBadge from "../../../widgets /badges/basic_badge";
import { AdvanceType } from "../../../_events/advance/type";
import { useFindAllAdvancesPendingByEnterprise } from "../../../_hooks/advance/useFindAllAdvancesPendingByEnterprise.hook";
import { useApproveAdvance } from "../../../_hooks/advance/useApproveAdvance.hook";
import { useDeclineAdvance } from "../../../_hooks/advance/useDeclineAdvance.hook";

export default function Table(){

    const dataHook = useFindAllAdvancesPendingByEnterprise(getCompany());
    const searchBox = useBasicTableSearchBox<AdvanceType>();
    const approveAdvance = useApproveAdvance();
    const declineAvance = useDeclineAdvance();
    
    const columns: TableColumnsType<AdvanceType> = [
        {
            title: 'Empleado',
            dataIndex: 'employee',
            key: 'employee',
            width: '20%',
            render: (text: string, param: AdvanceType, key: number) => (
                <span key={`advance_employee_${key}`}>{typeof param.employee === 'object' ? param.employee?.name : 'NA'}</span>
            )
        },
        {
            title: 'Valor',
            dataIndex: 'value',
            key: 'value',
            width: '20%',
            ...searchBox.getColumnSearchProps('value'),
        },
        {
            title: 'Costo',
            dataIndex: 'cost',
            key: 'cost',
            width: '20%',
            ...searchBox.getColumnSearchProps('cost'),
        },
        {
            title: 'Fecha',
            dataIndex: 'created_date',
            key: 'created_date',
            width: '20%',
            ...searchBox.getColumnSearchProps('created_date'),
        },
        {
            title: 'Estado',
            dataIndex: 'enterprise',
            key: 'enterprise',
            width: '10%',
            render: (text: string, param: AdvanceType, key: number) => (
                <span key={`amount_active_${key}`}>{(typeof param.state === 'object' && param.state.cod === 'PEND') ? <BasicBadge text="PENDIENTE" color="warning" /> : (typeof param.state === 'object' && param.state.cod === 'APPR') ? <BasicBadge text="Aprobado" color="success" /> : <BasicBadge text="No aprobado" color="danger" />}</span>
            )
        },
        {
            title: 'Acción',
            dataIndex: 'uuid',
            key: 'uuid',
            width: '10%',
            render: (text: string, param: AdvanceType, key: number) => (
                <div className="flex-row">
                    <Button
                        style={{ margin: '0 5px' }}
                        type="primary"
                        onClick={() => {
                            approveAdvance.approve(param.uuid ?? '', () => {
                                dataHook.loadData(getCompany());
                            })
                        }}
                    >
                        Aprobar
                    </Button>
                    <Button
                        style={{ margin: '0 5px' }}
                        danger
                        onClick={() => {
                            declineAvance.decline(param.uuid ?? '', () => {
                                dataHook.loadData(getCompany());
                            })
                        }}
                    >
                        Rechazar
                    </Button>
                </div>
            )
        },
    ];

    return(
        <div style={{ width: '100%' }}>
            <BasicDatatable columns={columns} data={dataHook.data} pagination={true} />
        </div>
    );
}