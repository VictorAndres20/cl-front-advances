import { Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import { advance_path, history_path } from "../path_pages";
import { BookOutlined, DollarOutlined, LogoutOutlined } from "@ant-design/icons";
import { useLogout } from "../../_hooks/login/useLogout.hook";

const items = [
    {
        label: (
            <Link to={advance_path.full_path}><DollarOutlined /> Solicitud</Link>
        ),
        key: 'advance',
    },
    {
        label: (
            <Link to={history_path.full_path}><BookOutlined /> Historial</Link>
        ),
        key: 'history',
    },
    {
        label: 'Salir',
        key: 'logout',
        icon: <LogoutOutlined />,
    },
  ];

export default function UserTemplate(){

    const currentPaths = window.location.pathname.split("/");

    const hook = useLogout();

    const clickMenu = ({ key }: { key: string }) => {
        if(key === 'logout'){
            hook.logout();
        }
    }

    return(
        <div>
            <div style={{ margin: '5px 0', borderRadius: '50%', height: '5px', background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 19%, rgba(0,212,255,1) 100%)' }}>
            </div>
            <Menu onClick={clickMenu} defaultSelectedKeys={[`${currentPaths[currentPaths.length - 1]}`]} mode="horizontal" items={items} />
            <div style={{ margin: '5px 0', borderRadius: '50%', height: '5px', background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 19%, rgba(0,212,255,1) 100%)' }}>
            </div>
            <Outlet />
        </div>
    );
}