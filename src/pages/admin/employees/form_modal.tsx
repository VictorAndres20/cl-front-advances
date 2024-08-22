import { Button, Col, Input, Modal, Row } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useCreateEmployee } from "../../../_hooks/employees/useCreateEmployee.hook";
import { useUpdateEmployee } from "../../../_hooks/employees/useUpdteEmployee.hook";
import RangeEnterpriseSelect from "../../../widgets /selects/range_enterprise_select";
import ChangePasswordForm from "./change_password_form";
import BanksSelect from "../../../widgets /selects/banks_select";
import BanksAccountTypeSelect from "../../../widgets /selects/bank_account_type_select";
import FintechSelect from "../../../widgets /selects/fintech_select";

export default function FormModal({ id, reload }: { id?: string, reload: Function }){

    const createHook = useCreateEmployee(reload);
    const updateHook = useUpdateEmployee(reload);
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
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Número de identificación</div>
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
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Número de teléfono</div>
                        <Input 
                            type="number"
                            value={ id ? updateHook.entity.phone : createHook.entity.phone }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        phone: e.target.value
                                    });
                                } else {
                                    createHook.setEntity({
                                        ...createHook.entity,
                                        phone: e.target.value
                                    });
                                }
                            }}
                        />
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Salario (quincenal o mensual?)</div>
                        <Input 
                            type="number"
                            value={ id ? updateHook.entity.salary : createHook.entity.salary }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        salary: Number(e.target.value)
                                    });
                                } else {
                                    createHook.setEntity({
                                        ...createHook.entity,
                                        salary: Number(e.target.value)
                                    });
                                }
                            }}
                        />
                        {
                            ! id && 
                            <div>
                                <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Contraseña</div>
                                <Input.Password 
                                    value={ createHook.entity.password }
                                    onChange={(e) => {
                                        createHook.setEntity({
                                            ...createHook.entity,
                                            password: e.target.value
                                        });
                                    }}
                                />
                            </div>
                        }
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Rango asociado</div>
                        <RangeEnterpriseSelect 
                            value={ id ?  (typeof updateHook.entity.range !== 'object' ? updateHook.entity.range : undefined) ?? '' : (typeof createHook.entity.range !== 'object' ? createHook.entity.range : undefined) ?? '' }
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
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Banco asociado</div>
                        <BanksSelect 
                            value={ id ?  (typeof updateHook.entity.bank !== 'object' ? updateHook.entity.bank : undefined) ?? '' : (typeof createHook.entity.bank !== 'object' ? createHook.entity.bank : undefined) ?? '' }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        bank: e
                                    });
                                } else {
                                    createHook.setEntity({
                                        ...createHook.entity,
                                        bank: e
                                    });
                                }
                            }}
                        />
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Tipo de cuenta</div>
                        <BanksAccountTypeSelect 
                            value={ id ?  (typeof updateHook.entity.bank_account_type !== 'object' ? updateHook.entity.bank_account_type : undefined) ?? '' : (typeof createHook.entity.bank_account_type !== 'object' ? createHook.entity.bank_account_type : undefined) ?? '' }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        bank_account_type: e
                                    });
                                } else {
                                    createHook.setEntity({
                                        ...createHook.entity,
                                        bank_account_type: e
                                    });
                                }
                            }}
                        />
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>(*) Número de cuenta</div>
                        <Input
                            value={ id ? updateHook.entity.bank_account_number ?? '' : createHook.entity.bank_account_number ?? '' }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        bank_account_number: e.target.value
                                    });
                                } else {
                                    createHook.setEntity({
                                        ...createHook.entity,
                                        bank_account_number: e.target.value
                                    });
                                }
                            }}
                        />
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>Plataforma financiera</div>
                        <FintechSelect 
                            value={ id ?  (typeof updateHook.entity.fintech !== 'object' ? updateHook.entity.fintech : undefined) ?? '' : (typeof createHook.entity.fintech !== 'object' ? createHook.entity.fintech : undefined) ?? '' }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        fintech: e
                                    });
                                } else {
                                    createHook.setEntity({
                                        ...createHook.entity,
                                        fintech: e
                                    });
                                }
                            }}
                        />
                        <div style={{ fontSize: '0.9em', fontWeight: 'bold', marginTop: '25px' }}>Número</div>
                        <Input
                            value={ id ? updateHook.entity.fintech_account_number ?? '' : createHook.entity.fintech_account_number ?? '' }
                            onChange={(e) => {
                                if(id){
                                    updateHook.setEntity({
                                        ...updateHook.entity,
                                        fintech_account_number: e.target.value
                                    });
                                } else {
                                    createHook.setEntity({
                                        ...createHook.entity,
                                        fintech_account_number: e.target.value
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
                {
                    id &&
                    <ChangePasswordForm id={id} updateHook={updateHook} />
                }
            </Modal>
        </div>
    );
}