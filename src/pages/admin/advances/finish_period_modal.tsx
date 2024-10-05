import { Button, Col, Input, Modal, Popconfirm, Row } from "antd";
import { useState } from "react";
import { useCreatePeriod } from "../../../_hooks/advance_period/use-create-period.hook";

export default function FinishPeriodModal({ enterprise, period, reload }: { enterprise?: number, period?: string, reload?: () => void }){

    const createHook = useCreatePeriod();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return(
        <div>
            <Button onClick={showModal} style={{ width: '180px' }} size="small" type="primary">
                Finalizar periodo
            </Button>
            <Modal title="Finalizar periodo" open={isModalOpen} footer={<Button onClick={handleCancel}>Cancelar</Button>} onCancel={handleCancel}>
                <Row>
                    <Col lg={24} xs={24}>
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Nombre de nuevo periodo</div>
                        <Input 
                            value={ createHook.entity.name }
                            onChange={(e) => {
                                createHook.setEntity({
                                    ...createHook.entity,
                                    name: e.target.value
                                });
                            }}
                        />
                        <div className="flex-col flex-center" style={{ margin: '25px 0' }}>
                            {
                                createHook.loading ?
                                <div className="vp-spinner"></div>
                                :
                                <Popconfirm
                                    title='Finalizar'
                                    description='Finalizar periodo y crear uno nuevo'
                                    onConfirm={() => {
                                        createHook.createPeriod(enterprise, period, () => {
                                            reload?.();
                                            handleCancel();
                                        });
                                    }}
                                >
                                    <Button
                                        style={{ width: '300px' }}
                                        type="primary"
                                    >
                                        Finalizar y crear nuevo
                                    </Button>
                                </Popconfirm>
                            }
                        </div>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
}