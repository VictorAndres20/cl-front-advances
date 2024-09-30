import { Button, Input, Popconfirm } from "antd";
import { EmployeeExcelType } from "../../../../_events/employee/type";
import { useCreateEmployee } from "../../../../_hooks/employees/useCreateEmployee.hook";
import RangeEnterpriseSelect from "../../../../widgets /selects/range_enterprise_select";
import BanksSelect from "../../../../widgets /selects/banks_select";
import BanksAccountTypeSelect from "../../../../widgets /selects/bank_account_type_select";
import FintechSelect from "../../../../widgets /selects/fintech_select";

export interface EmployeeRowProps {
    employee: EmployeeExcelType;
    removeEmployee: () => void;
}

export default function EmployeeRow({employee, removeEmployee}: EmployeeRowProps){

    const createHook = useCreateEmployee(() => {
        removeEmployee();
    }, employee);

    return(
        <tr>
            <td>
                <Input 
                    style={{ width: '200px' }}
                    value={ createHook.entity.name }
                    onChange={(e) => {
                        createHook.setEntity({
                            ...createHook.entity,
                            name: e.target.value
                        });
                    }}
                />
            </td>
            <td>
                <Input 
                    style={{ width: '120px' }}
                    value={ createHook.entity.id }
                    onChange={(e) => {
                        createHook.setEntity({
                            ...createHook.entity,
                            id: e.target.value
                        });
                    }}
                />
            </td>
            <td>
                <Input
                    style={{ width: '120px' }}
                    type="number"
                    value={ createHook.entity.phone }
                    onChange={(e) => {
                        createHook.setEntity({
                            ...createHook.entity,
                            phone: e.target.value
                        });
                    }}
                />
            </td>
            <td>
                <Input 
                    style={{ width: '120px' }}
                    type="number"
                    value={ createHook.entity.salary }
                    onChange={(e) => {
                        createHook.setEntity({
                            ...createHook.entity,
                            salary: Number(e.target.value)
                        });
                    }}
                />
            </td>
            <td>
                <Input.Password 
                    style={{ width: '120px' }}
                    value={ createHook.entity.password }
                    onChange={(e) => {
                        createHook.setEntity({
                            ...createHook.entity,
                            password: e.target.value
                        });
                    }}
                />
            </td>
            <td>
                <div style={{ width: '200px' }}>
                    <RangeEnterpriseSelect 
                        value={ (typeof createHook.entity.range !== 'object' ? createHook.entity.range : undefined) ?? '' }
                        onChange={(e) => {
                            createHook.setEntity({
                                ...createHook.entity,
                                range: e
                            });
                        }}
                    />
                </div>
            </td>
            <td>
                <BanksSelect 
                    value={ (typeof createHook.entity.bank !== 'object' ? createHook.entity.bank : undefined) ?? '' }
                    onChange={(e) => {
                        createHook.setEntity({
                            ...createHook.entity,
                            bank: e
                        });
                    }}
                />
            </td>
            <td>
                <BanksAccountTypeSelect 
                    value={ (typeof createHook.entity.bank_account_type !== 'object' ? createHook.entity.bank_account_type : undefined) ?? '' }
                    onChange={(e) => {
                        createHook.setEntity({
                            ...createHook.entity,
                            bank_account_type: e
                        });
                    }}
                />
            </td>
            <td>
                <Input
                    style={{ width: '120px' }}
                    value={ createHook.entity.bank_account_number ?? '' }
                    onChange={(e) => {
                        createHook.setEntity({
                            ...createHook.entity,
                            bank_account_number: e.target.value
                        });
                    }}
                />
            </td>
            <td>
                <FintechSelect 
                    value={ (typeof createHook.entity.fintech !== 'object' ? createHook.entity.fintech : undefined) ?? '' }
                    onChange={(e) => {
                        createHook.setEntity({
                            ...createHook.entity,
                            fintech: e
                        });
                    }}
                />
            </td>
            <td>
                <Input
                    style={{ width: '120px' }}
                    value={ createHook.entity.fintech_account_number ?? '' }
                    onChange={(e) => {
                        createHook.setEntity({
                            ...createHook.entity,
                            fintech_account_number: e.target.value
                        });
                    }}
                />
            </td>
            <td>
                <div className="flex-col flex-center" style={{ margin: '25px 0' }}>
                    {
                        createHook.loading ?
                        <div className="vp-spinner"></div>
                        :
                        <Popconfirm
                            title='Guardar'
                            description='Guardar empleado pendiente'
                            onConfirm={() => createHook.create()}
                        >
                            <Button
                                type="primary"
                            >
                                Guardar
                            </Button>
                        </Popconfirm>
                    }
                </div>
            </td>
            <td>
                <div className="flex-col flex-center" style={{ margin: '25px 0' }}>
                    <Popconfirm
                        title='Eliminar'
                        description='Elminar empleado pendiente'
                        onConfirm={removeEmployee}
                    >
                    <Button
                    >
                        Eliminar
                    </Button>
                    </Popconfirm>
                </div>
            </td>
        </tr>
    );
}