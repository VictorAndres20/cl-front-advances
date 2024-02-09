import { Button, Col, Input, Modal, Row } from "antd";
import { useState } from "react";
import { useCreateEnterprise } from "../../../_hooks/enterprise/useCreateEnterprise.hook";
import { EditOutlined } from "@ant-design/icons";
import { useUpdateEnterprise } from "../../../_hooks/enterprise/useUpdateEnterprise.hook";

export default function FormModal({ id, reload }){

    const createHook = useCreateEnterprise(reload);
    const updateHook = useUpdateEnterprise(reload);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <Modal title="Formulario" open={isModalOpen} footer={<Button onClick={handleCancel}>Cancelar</Button>}>
                <Row>
                    <Col lg={24} xs={24}>
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Nombre de la empresa</div>
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
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>Dirección</div>
                        <Input 
                            value={ id ? updateHook.entity.address : createHook.entity.address }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        address: e.target.value
                                    });
                                } else {
                                    createHook.setEntity({
                                        ...createHook.entity,
                                        address: e.target.value
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