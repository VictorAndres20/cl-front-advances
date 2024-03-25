import { Button, TableColumnsType } from "antd";
import { BasicDatatable } from "../../../widgets /antd_table/basic_datatable";
import { useBasicTableSearchBox } from "../../../widgets /antd_table/useBasicTableSearchBox.hook";
import BasicBadge from "../../../widgets /badges/basic_badge";
import { AdvanceType } from "../../../_events/advance/type";
import { useDownloadAdvancePdf } from "../../../_hooks/advance/useDownloadAdvancePdf.hook";
import { useFindAllAdvances } from "../../../_hooks/advance/useFindAllAdvances.hook";
import { buildTZDate } from "../../../_utils/dateFormat";

export default function Table(){

    const dataHook = useFindAllAdvances();
    const pdf = useDownloadAdvancePdf();
    const searchBox = useBasicTableSearchBox<AdvanceType>();
    
    const columns: TableColumnsType<AdvanceType> = [
        {
            title: '',
            dataIndex: 'uuid',
            key: 'uuid',
            width: '3%',
            render: (text: string, param: AdvanceType, key: number) => (
                <Button
                    key={`advance_pdf_${key}`}
                    onClick={() => pdf.download(param.uuid ?? '')}
                >PDF</Button>
            )
        },
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
            title: 'Identificación',
            dataIndex: 'employee.id',
            key: 'employee.id',
            width: '10%',
            render: (text: string, param: AdvanceType, key: number) => (
                <span key={`advance_employee_id_${key}`}>{typeof param.employee === 'object' ? param.employee?.id : 'NA'}</span>
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
            title: 'Solicitado',
            dataIndex: 'created_date',
            key: 'created_date',
            width: '10%',
            render: (text: string, param: AdvanceType, key: number) => (
                <span key={`advance_created_id_${key}`}>{buildTZDate(param.created_date)}</span>
            )
        },
        {
            title: 'Aprobado',
            dataIndex: 'approved_date',
            key: 'approved_date',
            width: '10%',
            render: (text: string, param: AdvanceType, key: number) => (
                <span key={`advance_app_id_${key}`}>{param.approved_date ? buildTZDate(param.approved_date) : ''}</span>
            )
        },
        {
            title: 'Rechazado',
            dataIndex: 'declined_date',
            key: 'declined_date',
            width: '10%',
            render: (text: string, param: AdvanceType, key: number) => (
                <span key={`advance_dec_id_${key}`}>{param.declined_date ? buildTZDate(param.declined_date) : ''}</span>
            )
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
    ];

    return(
        <div style={{ width: '100%' }}>
            <BasicDatatable columns={columns} data={dataHook.data} pagination={true} />
        </div>
    );
}