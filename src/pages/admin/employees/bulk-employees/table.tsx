import { EmployeeType } from "../../../../_events/employee/type";

type TableProps = {
    employees: EmployeeType[];
}

export default function Table({employees}: TableProps){

    return(
        <div style={{ width: '100%' }}>
            Table here {JSON.stringify(employees)}
        </div>
    );
}