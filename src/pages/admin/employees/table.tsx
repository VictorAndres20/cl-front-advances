import { Button, TableColumnsType } from "antd";
import { BasicDatatable } from "../../../widgets /antd_table/basic_datatable";
import { useBasicTableSearchBox } from "../../../widgets /antd_table/useBasicTableSearchBox.hook";
import FormModal from "./form_modal";
import { EmployeeType } from "../../../_events/employee/type";
import { getCompany } from "../../../_utils/storage_handler";
import { useFindAllEmployeesByEnterprise } from "../../../_hooks/employees/useFindAllEmployeesByEnterprise.hook";
import BasicBadge from "../../../widgets /badges/basic_badge";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useEmployeeStateChanger } from "../../../_hooks/employees/useEmployeeStateChanger.hook";

export default function Table(){

    const dataHook = useFindAllEmployeesByEnterprise(getCompany());
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
                <span key={`employee_bank_${key}`}>{typeof param.bank === 'object' ? param.bank?.name : 'NA'}</span>
            )
        },
        {
            title: 'Acciones',
            dataIndex: 'uuid',
            key: 'uuid',
            width: '20%',
            render: (text: string, param: EmployeeType, key: number) => (
                <div  key={`edit_employee_${key}`} className="flex-row">
                    <FormModal id={param.uuid} reload={dataHook.loadData} />
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
            <div style={{ width: '90%', display: 'flex', flexDirection: 'row-reverse' }}>
                <FormModal reload={dataHook.loadData} />
            </div>
            <BasicDatatable columns={columns} data={dataHook.data} pagination={true} />
        </div>
    );
}