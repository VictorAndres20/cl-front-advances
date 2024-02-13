import { Amount } from "../amount/type";
import { EmployeeType } from "../employee/type";
import { EnterpriseType } from "../enterprise/type";

export interface RangeType {
    uuid: string,
    id: string,
    enterprise?: number | EnterpriseType,
    amounts?: Amount[],
    employees?: EmployeeType[],
}