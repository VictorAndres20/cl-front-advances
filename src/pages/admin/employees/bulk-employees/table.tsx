import { EmployeeExcelType } from "../../../../_events/employee/type";
import EmployeeRow from "./employee-row";

type TableProps = {
    employees: EmployeeExcelType[];
    removeEmployee: (index: number, employees: EmployeeExcelType[]) => void;
}

export default function Table({employees, removeEmployee}: TableProps){

    if(employees.length === 0) return <div style={{ marginLeft: '20px' }}>Sin empleados cargados</div>

    return(
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <table className="employees-bulk-table">
                <thead>
                    <tr>
                        <th>
                            Nombre completo
                        </th>
                        <th>
                            Número de identificación
                        </th>
                        <th>
                            Número de teléfono
                        </th>
                        <th>
                            Salario
                        </th>
                        <th>
                            Contraseña
                        </th>
                        <th>
                            Rango asociado
                        </th>
                        <th>
                            Banco asociado
                        </th>
                        <th>
                            Tipo de cuenta
                        </th>
                        <th>
                            Número de cuenta
                        </th>
                        <th>
                            Plataforma financiera
                        </th>
                        <th>
                            Número
                        </th>
                        <th>
                            Guardar
                        </th>
                        <th>
                            Guardar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((employee, index) => (
                            <EmployeeRow 
                                key={index} 
                                removeEmployee={() => {
                                    removeEmployee(index, employees);
                                }} 
                                employee={employee} 
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}