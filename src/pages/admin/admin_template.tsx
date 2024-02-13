import { Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import { advances_inbox_path, advances_path, amounts_path, employees_path, enterprises_path, ranges_path, users_path } from "../path_pages";
import { ClusterOutlined, DollarOutlined, IdcardOutlined, LogoutOutlined, ScheduleOutlined, ShopOutlined, SolutionOutlined, TeamOutlined } from "@ant-design/icons";
import { useLogout } from "../../_hooks/login/useLogout.hook";

const items = [
    {
        label: (
            <Link to={enterprises_path.full_path}><ShopOutlined /> Empresas</Link>
        ),
        key: 'enterprises',
    },
    {
        label: (
            <Link to={users_path.full_path}><IdcardOutlined /> Usuarios</Link>
        ),
        key: 'users',
    },
    {
        label: (
            <span><TeamOutlined /> Empleados</span>
        ),
        key: 'group1',
        type: 'divider',
        children: [
            {
                label: (
                    <Link to={ranges_path.full_path}><ClusterOutlined /> Rangos</Link>
                ),
                key: 'ranges',
            },
            {
                label: (
                    <Link to={amounts_path.full_path}><ClusterOutlined /> Montos</Link>
                ),
                key: 'amounts',
            },
            {
                label: (
                    <Link to={employees_path.full_path}><TeamOutlined /> Empleados</Link>
                ),
                key: 'employees',
            },
        ]
    },
    {
        label: (
            <span><DollarOutlined /> Anticipos</span>
        ),
        key: 'group2',
        type: 'divider',
        children: [
            {
                label: (
                    <Link to={advances_inbox_path.full_path}><ScheduleOutlined /> Solicitudes</Link>
                ),
                key: 'advances-inbox',
            },
            {
                label: (
                    <Link to={advances_path.full_path}><SolutionOutlined /> Historial</Link>
                ),
                key: 'advances',
            },
        ]
    },
    {
        label: 'Salir',
        key: 'logout',
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
            <Menu onClick={clickMenu} defaultSelectedKeys={[`${currentPaths[currentPaths.length - 1]}`]} mode="horizontal" items={items} theme="dark" />
            <div style={{ backgroundColor: '#0BA8E8', height: '3px', marginBottom: '20px' }}></div>
            <Outlet />
        </div>
    );
}