import { TableColumnsType } from "antd";
import { BasicDatatable } from "../../../widgets /antd_table/basic_datatable";
import { useBasicTableSearchBox } from "../../../widgets /antd_table/useBasicTableSearchBox.hook";
import FormModal from "./form_modal";
import { useFindAllUsers } from "../../../_hooks/user/useFindAllUsers.hook";
import { UserType } from "../../../_events/user/type";
import BasicBadge from "../../../widgets /badges/basic_badge";

export default function Table(){

    const dataHook = useFindAllUsers();
    const searchBox = useBasicTableSearchBox<UserType>();
    
    const columns: TableColumnsType<UserType> = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...searchBox.getColumnSearchProps('name'),
        },
        {
            title: 'Correo',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            ...searchBox.getColumnSearchProps('email'),
        },
        {
            title: 'Usuario',
            dataIndex: 'login',
            key: 'login',
            width: '10%',
            ...searchBox.getColumnSearchProps('login'),
        },
        {
            title: 'Empresa',
            dataIndex: 'enterprise',
            key: 'enterprise',
            width: '20%',
            render: (text: string, param: UserType, key: number) => (
                <span key={`enter_user_${key}`}>{typeof param.enterprise === 'object' ? param.enterprise?.name : 'N.A'}</span>
            )
        },
        {
            title: 'Rol',
            dataIndex: 'rol',
            key: 'rol',
            width: '10%',
            render: (text: string, param: UserType, key: number) => (
                <span key={`rol_user_${key}`}>{typeof param.rol === 'object' ? param.rol?.name : 'N.A'}</span>
            )
        },
        {
            title: 'Estado',
            dataIndex: 'active',
            key: 'active',
            width: '10%',
            render: (text: string, param: UserType, key: number) => (
                <span key={`active_user_${key}`}>{param.active === 1 ? <BasicBadge text="Activo" color="success" /> : <BasicBadge text="Inactivo" color="danger" /> }</span>
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