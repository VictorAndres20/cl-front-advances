import { Button, Col, Input, Modal, Row } from "antd";
import { useState } from "react";
import { useCreateRange } from "../../../_hooks/range/useCreateRange.hook";
import { EditOutlined } from "@ant-design/icons";
import { useUpdateRange } from "../../../_hooks/range/useUpdateRange.hook";
import { getCompanyName } from "../../../_utils/storage_handler";

export default function FormModal({ id, reload }: { id?: string, reload: Function }){

    const createHook = useCreateRange(reload);
    const updateHook = useUpdateRange(reload);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
        if(id) updateHook.loadEntity(id);
    };

    const handleCancel = () => {
        createHook.cleanEntity();
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
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Id del rango</div>
                        <Input 
                            value={ id ? updateHook.entity.id : createHook.entity.id }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        id: e.target.value
                                    });
                                } else {
                                    createHook.setEntity({
                                        ...createHook.entity,
                                        id: e.target.value
                                    });
                                }
                            }}
                        />
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Empresa asociada</div>
                        <span>{getCompanyName()}</span>
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