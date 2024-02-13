import { Button, Col, Input, Modal, Row } from "antd";
import { useState } from "react";
import { useCreateAmount } from "../../../_hooks/amount/useCreateAmount.hook";
import { EditOutlined } from "@ant-design/icons";
import { useUpdateAmount } from "../../../_hooks/amount/useUpdateAmount.hook";
import RangeEnterpriseSelect from "../../../widgets /selects/range_enterprise_select";

export default function FormModal({ id, reload }: { id?: string, reload: Function }){

    const createHook = useCreateAmount(reload);
    const updateHook = useUpdateAmount(reload);
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
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Valor del monto</div>
                        <Input
                            type="number"
                            value={ id ? updateHook.entity.value : createHook.entity.value }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        value: Number(e.target.value)
                                    });
                                } else {
                                    createHook.setEntity({
                                        ...createHook.entity,
                                        value: Number(e.target.value)
                                    });
                                }
                            }}
                        />
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Costo del anticipo</div>
                        <Input
                            type="number"
                            value={ id ? updateHook.entity.cost : createHook.entity.cost }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        cost: Number(e.target.value)
                                    });
                                } else {
                                    createHook.setEntity({
                                        ...createHook.entity,
                                        cost: Number(e.target.value)
                                    });
                                }
                            }}
                        />
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Rango asociado</div>
                        <RangeEnterpriseSelect 
                            value={ id ? (typeof updateHook.entity.range !== 'object' ? updateHook.entity.range ?? '' : '' ) : (typeof createHook.entity.range !== 'object' ? createHook.entity.range ?? '' : '' ) }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        range: e
                                    });
                                } else {
                                    createHook.setEntity({
                                        ...createHook.entity,
                                        range: e
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