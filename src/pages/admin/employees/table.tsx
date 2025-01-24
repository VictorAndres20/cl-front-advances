import { Button, Popconfirm, TableColumnsType } from "antd";
import { BasicDatatable } from "../../../widgets /antd_table/basic_datatable";
import { useBasicTableSearchBox } from "../../../widgets /antd_table/useBasicTableSearchBox.hook";
import FormModal from "./form_modal";
import { EmployeeType } from "../../../_events/employee/type";
import { getCompany, getRol, getUserId } from "../../../_utils/storage_handler";
import BasicBadge from "../../../widgets /badges/basic_badge";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useEmployeeStateChanger } from "../../../_hooks/employees/useEmployeeStateChanger.hook";
import { useEmployeesByRol } from "../../../_hooks/employees/use-employees-by-rol.hook";
import { Link } from "react-router-dom";
import { bulk_employees_path } from "../../path_pages";
import { roles } from "../../../_config/roles";
import { useUpdateRetireEmployee } from "../../../_hooks/employees/use-update-retire-employee";
import { buildDateByUTCString, buildTZDate, getNowUTCString } from "../../../_utils/dateFormat";

const tableStyle = { fontSize: '0.8em' };

export default function Table(){

    const dataHook = useEmployeesByRol(getRol() ?? '', getCompany());
    const searchBox = useBasicTableSearchBox<EmployeeType>();
    const stateChanger = useEmployeeStateChanger();
    const retireStateChanger = useUpdateRetireEmployee();
    
    const columns: TableColumnsType<EmployeeType> = [
        {
            title: 'Estado',
            dataIndex: 'active',
            key: 'active',
            width: '5%',
            render: (text: string, param: EmployeeType, key: number) => (
                <div key={`active_user_${key}`} className="flex-col">
                    <span>{param.state === 1 ? <BasicBadge text="Activo" color="success" /> : <BasicBadge text="Inactivo" color="danger" /> }</span>
                    {
                        param.retired_date &&
                        <div>
                            <span><BasicBadge text='Retirado' color="danger" /></span>
                        </div>
                    }
                </div>
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
                <div className="flex-col">
                    <span key={`employee_range_${key}`}>{typeof param.range === 'object' ? param.range?.id : 'NA'}</span>
                    {
                        typeof param.range === 'object' && param.range?.active === 0 &&
                        <div className="flex-col flex-center">
                            <span style={{ padding: '5px 5px', border: '1px solid red', fontSize: '0.6em', borderRadius: '20px' }}>Rango eliminado</span>
                        </div>
                    }
                </div>
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
                        <div className="flex-row">
                            <FormModal id={param.uuid} reload={dataHook.loadData} />
                            {
                                param.state === 1 ?
                                <Popconfirm
                                    title="Bloquear empleado"
                                    description="¿Quieres bloquear a este empleado?"
                                    onConfirm={() => stateChanger.blocker.block(param.uuid, () => dataHook.loadData(getCompany()))}
                                >
                                    <Button style={{ marginLeft: '10px' }} danger icon={<CloseCircleOutlined />} >Bloquear</Button>
                                </Popconfirm>
                                :
                                <Popconfirm
                                    title="Activar empleado"
                                    description="¿Quieres activar a este empleado?"
                                    onConfirm={() => stateChanger.activate.activate(param.uuid, () => dataHook.loadData(getCompany()))}
                                >
                                    <Button style={{ marginLeft: '10px' }}  type="primary" icon={<CheckCircleOutlined />} >Activar</Button>
                                </Popconfirm> 
                            }
                        </div>
                    }
                    {
                        param.retired_date ?
                        <Popconfirm
                            title="Volver a incorporar a empleado"
                            description="¿Quieres volver a incorporar a este empleado?"
                            onConfirm={() => retireStateChanger.unretire.unretire({uuid: param.uuid}, () => dataHook.loadData(getCompany()))}
                        >
                            <Button style={{ marginLeft: '10px' }} type="primary" icon={<CheckCircleOutlined />} >Incorporar</Button>
                        </Popconfirm>
                        :
                        <Popconfirm
                            title="Retirar a empleado"
                            description="¿Quieres retirar a este empleado?"
                            onConfirm={() => retireStateChanger.retire.retire({uuid: param.uuid, retired_date: getNowUTCString(), retired_by: getUserId()}, () => dataHook.loadData(getCompany()))}
                        >
                            <Button style={{ marginLeft: '10px' }}  danger icon={<CloseCircleOutlined />} >Retirar</Button>
                        </Popconfirm>
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