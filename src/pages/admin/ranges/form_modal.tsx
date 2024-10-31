import { Button, Col, Input, Modal, Row } from "antd";
import { useState } from "react";
import { useCreateRange } from "../../../_hooks/range/useCreateRange.hook";
import { EditOutlined } from "@ant-design/icons";
import { useUpdateRange } from "../../../_hooks/range/useUpdateRange.hook";
import { getCompanyName, getRol } from "../../../_utils/storage_handler";
import { roles } from "../../../_config/roles";
import EnterpriseSelect from "../../../widgets /selects/enterprise_select";

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
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Tope de dinero de anticipo</div>
                        <Input 
                            type="number"
                            value={ id ? updateHook.entity.money_limit : createHook.entity.money_limit }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        money_limit: Number(e.target.value)
                                    });
                                } else {
                                    createHook.setEntity({
                                        ...createHook.entity,
                                        money_limit: Number(e.target.value)
                                    });
                                }
                            }}
                        />
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Empresa asociada</div>
                        {
                        getRol() === roles.root ?
                            <EnterpriseSelect 
                                value={id ? (typeof updateHook.entity.enterprise === 'object' ? updateHook.entity.enterprise.id ?? 0 : updateHook.entity.enterprise ?? 0) : (typeof createHook.entity.enterprise === 'object' ? createHook.entity.enterprise.id ?? 0 : createHook.entity.enterprise ?? 0)} 
                                onChange={(enterprise) => {
                                    if(id){
                                        updateHook.setEntity({
                                            ...updateHook.entity,
                                            enterprise
                                        });
                                    } else {
                                        createHook.setEntity({
                                            ...createHook.entity,
                                            enterprise
                                        });
                                    }
                                }} 
                            />
                        : 
                            <span>{getCompanyName()}</span>
                        }
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