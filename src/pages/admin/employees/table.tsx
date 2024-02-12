import { TableColumnsType } from "antd";
import { BasicDatatable } from "../../../widgets /antd_table/basic_datatable";
import { useBasicTableSearchBox } from "../../../widgets /antd_table/useBasicTableSearchBox.hook";
import FormModal from "./form_modal";
import { RangeType } from "../../../_events/range/type";
import { EmployeeType } from "../../../_events/employee/type";
import { getCompany } from "../../../_utils/storage_handler";
import { useFindAllEmployeesByEnterprise } from "../../../_hooks/employees/useFindAllEmployeesByEnterprise.hook";
import BasicBadge from "../../../widgets /badges/basic_badge";

export default function Table(){

    const dataHook = useFindAllEmployeesByEnterprise(getCompany());
    const searchBox = useBasicTableSearchBox<EmployeeType>();
    
    const columns: TableColumnsType<EmployeeType> = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...searchBox.getColumnSearchProps('name'),
        },
        {
            title: 'Identificación',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            ...searchBox.getColumnSearchProps('id'),
        },
        {
            title: 'Teléfono',
            dataIndex: 'phone',
            key: 'phone',
            width: '20%',
            ...searchBox.getColumnSearchProps('phone'),
        },
        {
            title: 'Salario',
            dataIndex: 'salary',
            key: 'salary',
            width: '10%',
            ...searchBox.getColumnSearchProps('salary'),
        },
        {
            title: 'Rango',
            dataIndex: 'range',
            key: 'range',
            width: '5%',
            render: (text: string, param: EmployeeType, key: number) => (
                <span key={`employee_range_${key}`}>{typeof param.range === 'object' ? param.range?.id : 'NA'}</span>
            )
        },
        {
            title: 'Empresa',
            dataIndex: 'enterprise',
            key: 'enterprise',
            width: '20%',
            render: (text: string, param: EmployeeType, key: number) => (
                <span key={`employee_enterprise_${key}`}>{typeof param.range === 'object' ? typeof param.range?.enterprise === 'object' ? param.range?.enterprise?.name : 'NA' : 'NA'}</span>
            )
        },
        {
            title: 'Activo',
            dataIndex: 'active',
            key: 'active',
            width: '5%',
            render: (text: string, param: EmployeeType, key: number) => (
                <span key={`active_user_${key}`}>{param.state === 1 ? <BasicBadge text="Activo" color="success" /> : <BasicBadge text="Inactivo" color="danger" /> }</span>
            )
        },
        {
            title: 'Acciones',
            dataIndex: 'uuid',
            key: 'uuid',
            width: '10%',
            render: (text: string, param: RangeType, key: number) => (
                <FormModal key={`edit_employee_${key}`} id={param.uuid} reload={dataHook.loadData} />
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