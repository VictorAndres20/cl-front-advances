import { Button, TableColumnsType } from "antd";
import { BasicDatatable } from "../../../widgets /antd_table/basic_datatable";
import { useBasicTableSearchBox } from "../../../widgets /antd_table/useBasicTableSearchBox.hook";
import FormModal from "./form_modal";
import { EmployeeType } from "../../../_events/employee/type";
import { getCompany, getRol } from "../../../_utils/storage_handler";
import BasicBadge from "../../../widgets /badges/basic_badge";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useEmployeeStateChanger } from "../../../_hooks/employees/useEmployeeStateChanger.hook";
import { useEmployeesByRol } from "../../../_hooks/employees/use-employees-by-rol.hook";
import { Link } from "react-router-dom";
import { bulk_employees_path } from "../../path_pages";
import { roles } from "../../../_config/roles";

const tableStyle = { fontSize: '0.8em' };

export default function Table(){

    const dataHook = useEmployeesByRol(getRol() ?? '', getCompany());
    const searchBox = useBasicTableSearchBox<EmployeeType>();
    const stateChanger = useEmployeeStateChanger();
    
    const columns: TableColumnsType<EmployeeType> = [
        {
            title: 'Estado',
            dataIndex: 'active',
            key: 'active',
            width: '5%',
            render: (text: string, param: EmployeeType, key: number) => (
                <span key={`active_user_${key}`}>{param.state === 1 ? <BasicBadge text="Activo" color="success" /> : <BasicBadge text="Inactivo" color="danger" /> }</span>
            )
        },
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
            width: '15%',
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
            width: '10%',
            render: (text: string, param: EmployeeType, key: number) => (
                <span key={`employee_enterprise_${key}`}>{typeof param.range === 'object' ? typeof param.range?.enterprise === 'object' ? param.range?.enterprise?.name : 'NA' : 'NA'}</span>
            )
        },
        {
            title: 'Banco',
            dataIndex: 'bank',
            key: 'bank',
            width: '10%',
            render: (text: string, param: EmployeeType, key: number) => (
                <span style={tableStyle} key={`employee_bank_${key}`}>{typeof param.bank === 'object' ? `${param.bank?.name}, ${typeof param.bank_account_type === 'object' && param.bank_account_type?.name} ${param.bank_account_number ?? ''}` : 'NA'}</span>
            )
        },
        {
            title: 'Plataforma',
            dataIndex: 'fintech',
            key: 'fintech',
            width: '10%',
            render: (text: string, param: EmployeeType, key: number) => (
                <span style={tableStyle} key={`employee_fintech_${key}`}>{typeof param.fintech === 'object' ? `${param.fintech?.name ?? 'N.A.'} ${param.fintech_account_number ?? ''}` : 'NA'}</span>
            )
        },
        {
            title: 'Acciones',
            dataIndex: 'uuid',
            key: 'uuid',
            width: '20%',
            render: (text: string, param: EmployeeType, key: number) => (
                <div  key={`edit_employee_${key}`} className="flex-row">
                    {
                        getRol() === roles.root &&
                        <FormModal id={param.uuid} reload={dataHook.loadData} />
                    }
                    {
                        param.state === 1 ?
                        <Button onClick={() => stateChanger.blocker.block(param.uuid, () => dataHook.loadData(getCompany()))} style={{ margin: '0 20px' }} danger shape="circle" icon={<CloseCircleOutlined />} />
                        :
                        <Button onClick={() => stateChanger.activate.activate(param.uuid, () => dataHook.loadData(getCompany()))} style={{ margin: '0 20px' }}  type="primary" shape="circle" icon={<CheckCircleOutlined />} />
                    }
                </div>
            )
        },
    ];

    return(
        <div style={{ width: '100%' }}>
            {
                getRol() === roles.root && 
                <div style={{ width: '90%', display: 'flex', flexDirection: 'row-reverse', marginBottom: '10px' }}>
                    <Link style={{ marginLeft: '10px' }} to={bulk_employees_path.full_path}>
                        <Button type="primary">
                            Importar empleados
                        </Button>
                    </Link>
                    <FormModal reload={dataHook.loadData} />
                </div>
            }
            <BasicDatatable columns={columns} data={dataHook.data} pagination={true} />
        </div>
    );
}