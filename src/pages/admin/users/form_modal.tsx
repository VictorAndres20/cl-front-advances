import { Button, Col, Input, Modal, Row } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useCreateUser } from "../../../_hooks/user/useCreateUser.hook";
import { useUpdateUser } from "../../../_hooks/user/useUpdateUser.hook";
import EnterpriseSelect from "../../../widgets /selects/enterprise_select";

export default function FormModal({ id, reload }: { id?: string, reload: Function }){

    const createHook = useCreateUser(reload);
    const updateHook = useUpdateUser(reload);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
        if(id) updateHook.loadEntity(id);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return(
        <div>
            <Button type="primary" onClick={showModal}>
                {
                    id ?
                    <EditOutlined />
                    :
                    'Crear nuevo'
                }
            </Button>
            <Modal title="Formulario" open={isModalOpen} footer={<Button onClick={handleCancel}>Cancelar</Button>} onCancel={handleCancel}>
                <Row>
                    <Col lg={24} xs={24}>
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Nombre completo</div>
                        <Input 
                            value={ id ? updateHook.entity.name : createHook.entity.name }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        name: e.target.value
                                    });
                                } else {
                                    createHook.setEntity({
                                        ...createHook.entity,
                                        name: e.target.value
                                    });
                                }
                            }}
                        />
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Correo</div>
                        <Input 
                            value={ id ? updateHook.entity.email ?? '' : createHook.entity.email ?? '' }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        email: e.target.value
                                    });
                                } else {
                                    createHook.setEntity({
                                        ...createHook.entity,
                                        email: e.target.value
                                    });
                                }
                            }}
                        />
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Usuario</div>
                        <Input 
                            value={ id ? updateHook.entity.login ?? '' : createHook.entity.login ?? '' }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        login: e.target.value
                                    });
                                } else {
                                    createHook.setEntity({
                                        ...createHook.entity,
                                        login: e.target.value
                                    });
                                }
                            }}
                        />
                        {
                           ! id &&
                           <div>
                                <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Contraseña</div>
                                <Input.Password 
                                    value={ createHook.entity.password ?? '' }
                                    onChange={(e) => {
                                        let newData = {
                                            ...createHook.entity,
                                            password: e.target.value
                                        };
                                        createHook.setEntity(newData);
                                    }}
                                />
                           </div>  
                        }
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Empresa</div>
                        <EnterpriseSelect 
                            value={ id ? (typeof updateHook.entity.enterprise === 'number' ? updateHook.entity.enterprise : 0) : (typeof createHook.entity.enterprise === 'number' ? createHook.entity.enterprise : 0) }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        enterprise: e
                                    });
                                } else {
                                    createHook.setEntity({
                                        ...createHook.entity,
                                        enterprise: e
                                    });
                                }
                            }}
                        />
                        <div className="flex-col flex-center" style={{ margin: '25px 0' }}>
                            {
                                createHook.loading || updateHook.loading ?
                                <div className="vp-spinner"></div>
                                :
                                <Button
                                    style={{ width: '300px' }}
                                    type="primary"
                                    onClick={() => {
                                        if(id) updateHook.update(id);
                                        else createHook.create();
                                    }}
                                >
                                    {
                                        id ?
                                        'Editar'
                                        :
                                        'Crear nuevo'
                                    }
                                </Button>
                            }
                        </div>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
}