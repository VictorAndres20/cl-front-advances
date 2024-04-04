import { LockOutlined, IdcardOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useLogin } from "../../_hooks/login/useLogin.hook";
import { enterKeyHandler } from "../../_utils/keyboard_events";

export default function LoginForm(){

    const hook = useLogin();

    return(
        <div className="flex-col flex-center" style={{ width: '100%' }}>
            <div className="card flex-col flex-center" style={{ width: '83%', marginTop: '50px' }}>
                <div className="flex-col flex-center" style={{ width: '100%' }}>
                    <img width={200} src={require('../../_assets/images/nomina.png')} alt='NOMINA' />
                </div>
                <span style={{ fontSize: '1.1em', fontWeight: 'bold' }}>Anticipos</span>
                <Input size="middle" prefix={<IdcardOutlined />} style={{ margin: '7px 0' }} 
                    value={ hook.entity.identification }
                    onChange={(e) => {
                        hook.setEntity({...hook.entity, identification: e.target.value});
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
            </div>
        </div>
    );
}