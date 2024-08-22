import { Button, TableColumnsType } from "antd";
import { BasicDatatable } from "../../../widgets /antd_table/basic_datatable";
import { useBasicTableSearchBox } from "../../../widgets /antd_table/useBasicTableSearchBox.hook";
import BasicBadge from "../../../widgets /badges/basic_badge";
import { AdvanceType } from "../../../_events/advance/type";
import { useApproveAdvance } from "../../../_hooks/advance/useApproveAdvance.hook";
import { useDeclineAdvance } from "../../../_hooks/advance/useDeclineAdvance.hook";
import { useFindAllPendingAdvances } from "../../../_hooks/advance/useFindAllPendingAdvance.hook";
import { buildTZDate } from "../../../_utils/dateFormat";

export default function Table(){

    const dataHook = useFindAllPendingAdvances();
    const searchBox = useBasicTableSearchBox<AdvanceType>();
    const approveAdvance = useApproveAdvance();
    const declineAvance = useDeclineAdvance();
    
    const columns: TableColumnsType<AdvanceType> = [
        {
            title: 'Empleado',
            dataIndex: 'employee',
            key: 'employee',
            width: '10%',
            render: (text: string, param: AdvanceType, key: number) => (
                <span key={`advance_employee_${key}`}>{typeof param.employee === 'object' ? param.employee?.name : 'NA'}</span>
            )
        },
        {
            title: 'Valor',
            dataIndex: 'value',
            key: 'value',
            width: '10%',
            ...searchBox.getColumnSearchProps('value'),
        },
        {
            title: 'Costo',
            dataIndex: 'cost',
            key: 'cost',
            width: '10%',
            ...searchBox.getColumnSearchProps('cost'),
        },
        {
            title: 'Fecha',
            dataIndex: 'created_date',
            key: 'created_date',
            width: '10%',
            render: (text: string, param: AdvanceType, key: number) => (
                <span key={`advance_created_id_${key}`}>{buildTZDate(param.created_date)}</span>
            )
        },
        {
            title: 'Empresa',
            dataIndex: 'enterprise',
            key: 'enterprise',
            width: '10%',
            render: (text: string, param: AdvanceType, key: number) => (
                <span key={`amount_enterprise_${key}`}>{
                    typeof param.employee === 'object' ? 
                    typeof param.employee?.range === 'object' ? 
                    typeof param.employee?.range?.enterprise === 'object' ? param.employee?.range?.enterprise.name
                    : '' : '' : ''}</span>
            )
        },
        {
            title: 'Depositar en',
            dataIndex: 'bank',
            key: 'bank',
            width: '10%',
            render: (text: string, param: AdvanceType, key: number) => (
                <span key={`amount_bank_${key}`}>{
                    !param.use_fintech ?
                    typeof param.employee === 'object' ? 
                    typeof param.employee?.bank === 'object' ? 
                    `${
                        param.employee?.bank?.name ?? ''
                    }, ${
                        typeof param.employee?.bank_account_type === 'object' ? 
                            param.employee?.bank_account_type?.name ?? ''
                        : ''
                    } ${
                        param.employee?.bank_account_number ?? ''
                    }`
                    : '' : ''
                    :
                    typeof param.employee === 'object' ? 
                    typeof param.employee?.fintech === 'object' ? 
                    `${
                        param.employee?.fintech?.name ?? ''
                    } ${
                        param.employee?.fintech_account_number ?? ''
                    }`
                    : '' : ''
                    }</span>
            )
        },
        {
            title: 'Estado',
            dataIndex: 'state',
            key: 'state',
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
                <div key={`amount_action_${key}`} className="flex-row">
                    <Button
                        style={{ margin: '0 5px' }}
                        type="primary"
                        onClick={() => {
                            approveAdvance.approve(param.uuid ?? '', () => {
                                dataHook.loadData();
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
                                dataHook.loadData();
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