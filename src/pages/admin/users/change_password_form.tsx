import { Button, Col, Divider, Input, Row } from "antd";
import { UpdateUserHook } from "../../../_hooks/user/useUpdateUser.hook";

export default function ChangePasswordForm({ id, updateHook }: { id: string, updateHook: UpdateUserHook }) {

    return(
        <Row>
            <Col lg={24} xs={24}>
                <Divider />
            </Col>
            <Col lg={24} xs={24}>
                <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Cambiar contraseña</div>
                <Input.Password 
                    value={ updateHook.entity.password ?? '' }
                    onChange={(e) => {
                        let newData = {
                            ...updateHook.entity,
                            password: e.target.value
                        };
                        updateHook.setEntity(newData);
                    }}
                />
                <div className="flex-col flex-center" style={{ margin: '25px 0' }}>
                    {
                        updateHook.loading ?
                        <div className="vp-spinner"></div>
                        :
                        <Button
                            style={{ width: '300px' }}
                            type="primary"
                            onClick={() => {
                                updateHook.updatePassword(id);
                            }}
                        >
                            Cambiar contraseña
                        </Button>
                    }
                </div>
            </Col>
        </Row>
    )
}