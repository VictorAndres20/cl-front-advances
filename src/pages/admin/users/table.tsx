import { TableColumnsType } from "antd";
import { BasicDatatable } from "../../../widgets /antd_table/basic_datatable";
import { useBasicTableSearchBox } from "../../../widgets /antd_table/useBasicTableSearchBox.hook";
import FormModal from "./form_modal";
import { useFindAllUsers } from "../../../_hooks/user/useFindAllUsers.hook";
import { UserType } from "../../../_events/user/type";

export default function Table(){

    const dataHook = useFindAllUsers();
    const searchBox = useBasicTableSearchBox<UserType>();
    
    const columns: TableColumnsType<UserType> = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
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
            width: '20%',
            ...searchBox.getColumnSearchProps('login'),
        },
        {
            title: 'Activo',
            dataIndex: 'active',
            key: 'active',
            width: '10%',
            render: (text: string, param: UserType, key: number) => (
                <span key={`active_user_${key}`}>{param.active}</span>
            )
        },
        {
            title: 'Acciones',
            dataIndex: 'uuid',
            key: 'uuid',
            width: '10%',
            render: (text: string, param: UserType, key: number) => (
                <FormModal key={`form_edit_user_${key}`} id={param.uuid} reload={dataHook.loadData} />
            )
        },
    ];

    return(
        <div style={{ width: '100%' }}>
            <div style={{ width: '90%', display: 'flex', flexDirection: 'row-reverse' }}>
                <FormModal reload={dataHook.loadData} />
            </div>
            <BasicDatatable columns={columns} data={dataHook.data} pagination={false} />
        </div>
    );
}