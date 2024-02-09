import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useLoginUser } from "../../../_hooks/login/useLoginUser.hook";
import { login_page_path } from "../../path_pages";
import { Link } from "react-router-dom";
import { enterKeyHandler } from "../../../_utils/keyboard_events";

export default function LoginForm(){

    const hook = useLoginUser();

    return(
        <div className="flex-col flex-center" style={{ width: '100%' }}>
            <div className="card flex-col flex-center" style={{ width: '83%', marginTop: '50px' }}>
                <span style={{ fontSize: '1.8em', fontWeight: 'bold' }}>CintaLabs</span>
                <span style={{ fontSize: '1.1em', fontWeight: 'bold' }}>ADMINISTRADOR DE ANTICIPOS</span>
                <Input size="middle" prefix={<UserOutlined />} style={{ margin: '7px 0' }} 
                    value={ hook.entity.identification }
                    onChange={(e) => {
                        hook.setEntity({...hook.entity, identification: e.target.value});
                    }}
                    onKeyDown={e => {
                        enterKeyHandler(e, hook.login)
                    }}
                />
                <Input.Password size="middle" prefix={<LockOutlined />} style={{ margin: '7px 0' }} 
                    value={ hook.entity.password }
                    onChange={(e) => {
                        hook.setEntity({...hook.entity, password: e.target.value});
                    }}
                    onKeyDown={e => {
                        enterKeyHandler(e, hook.login)
                    }}
                />
                <Button style={{ width: '95%' }} type="primary"
                    onClick={hook.login}
                >
                    Ingresar
                </Button>
                <div style={{ margin: '20px 0' }}>
                    <Link to={login_page_path.full_path}>
                        Quiero hacer un anticipo
                    </Link>
                </div>
            </div>
        </div>
    );
}