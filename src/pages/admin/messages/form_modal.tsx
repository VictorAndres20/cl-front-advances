import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useUpdateMessages } from "../../../_hooks/messages/use-update-messages";
import TextArea from "antd/es/input/TextArea";

export default function FormModal({ id, reload }: { id?: string, reload: Function }){
    const updateHook = useUpdateMessages(reload);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
        if(id) updateHook.loadEntity(id);
    };

    const handleCancel = () => {
        // createHook.cleanEntity();
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
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) NIT</div>
                        <TextArea 
                            rows={3}
                            value={ id ? updateHook.entity.message : '' }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        message: e.target.value
                                    });
                                } else {
                                    //createHook.setEntity({
                                    //    ...createHook.entity,
                                    //    nit: e.target.value
                                    //});
                                }
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
                                        if(id) updateHook.update(id);
                                        // else createHook.create();
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