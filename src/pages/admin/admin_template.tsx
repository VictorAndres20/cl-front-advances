import { Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import { advances_inbox_path, advances_path, amounts_path, bank_messages_path, employees_path, enterprises_path, messages_path, ranges_path, users_path } from "../path_pages";
import { MessageOutlined, ClusterOutlined, DollarOutlined, IdcardOutlined, LogoutOutlined, ScheduleOutlined, ShopOutlined, SolutionOutlined, TeamOutlined } from "@ant-design/icons";
import { useLogout } from "../../_hooks/login/useLogout.hook";
import { roles } from "../../_config/roles";
import { getRol } from "../../_utils/storage_handler";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";

type MenuItem = ItemType<MenuItemType> & {roles?: string[]};
type Item = ItemType<MenuItemType> & 
    {label?: React.ReactNode; roles?: string[], children?: MenuItem[]};

const items: Item[] = [
    {
        label: (
            <Link to={enterprises_path.full_path}><ShopOutlined /> Empresas</Link>
        ),
        key: 'enterprises',
        roles: [roles.root],
    },
    {
        label: (
            <Link to={users_path.full_path}><IdcardOutlined /> Usuarios</Link>
        ),
        key: 'users',
        roles: [roles.root],
    },
    {
        label: (
            <span><TeamOutlined /> Empleados</span>
        ),
        key: 'group1',
        type: 'divider',
        roles: [roles.root, roles.admin],
        children: [
            {
                label: (
                    <Link to={ranges_path.full_path}><ClusterOutlined /> Rangos</Link>
                ),
                key: 'ranges',
                roles: [roles.root],
            },
            {
                label: (
                    <Link to={amounts_path.full_path}><ClusterOutlined /> Montos</Link>
                ),
                key: 'amounts',
                roles: [roles.root],
            },
            {
                label: (
                    <Link to={employees_path.full_path}><TeamOutlined /> Empleados</Link>
                ),
                key: 'employees',
                roles: [roles.root, roles.admin],
            },
        ]
    },
    {
        label: (
            <span><MessageOutlined /> Mensajes</span>
        ),
        key: 'group2',
        type: 'divider',
        roles: [roles.root],
        children: [
            {
                label: (
                    <Link to={messages_path.full_path}><MessageOutlined /> Anticipos</Link>
                ),
                key: 'messages',
                roles: [roles.root],
            },
            {
                label: (
                    <Link to={bank_messages_path.full_path}><MessageOutlined /> Hor. bancarios</Link>
                ),
                key: 'bank_messages',
                roles: [roles.root],
            },
        ]
    },
    {
        label: (
            <span><DollarOutlined /> Anticipos</span>
        ),
        key: 'group3',
        type: 'divider',
        roles: [roles.root, roles.admin],
        children: [
            {
                label: (
                    <Link to={advances_inbox_path.full_path}><ScheduleOutlined /> Solicitudes</Link>
                ),
                key: 'advances-inbox',
                roles: [roles.root],
            },
            {
                label: (
                    <Link to={advances_path.full_path}><SolutionOutlined /> Historial</Link>
                ),
                key: 'advances',
                roles: [roles.root, roles.admin],
            },
        ]
    },
    {
        label: 'Salir',
        key: 'logout',
        roles: [roles.root, roles.admin],
        icon: <LogoutOutlined />,
    },
  ];

export default function AdminTemplate(){

    const currentPaths = window.location.pathname.split("/");

    const hook = useLogout();

    const clickMenu = ({ key }: { key: string }) => {
        if(key === 'logout'){
            hook.logoutUser();
        }
    }

    return(
        <div>
            <div style={{ backgroundColor: '#0BA8E8', height: '3px' }}></div>
            <Menu 
                onClick={clickMenu} 
                defaultSelectedKeys={[`${currentPaths[currentPaths.length - 1]}`]} 
                mode="horizontal" 
                items={
                    items.filter( i => i.roles ? i.roles.some( r => r === getRol()) : true )
                    .map((i) => ({...i, children: i.children?.filter(i => i.roles ? i.roles.some( r => r === getRol()) : true)}))
                } 
                theme="dark" 
            />
            <div style={{ backgroundColor: '#0BA8E8', height: '3px', marginBottom: '20px' }}></div>
            <Outlet />
        </div>
    );
}