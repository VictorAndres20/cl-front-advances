import { Amount } from "../amount/type";
import { EmployeeType } from "../employee/type";
import { EnterpriseType } from "../enterprise/type";

export interface RangeType {
    uuid: string,
    id: string,
    money_limit: number,
    enterprise?: number | EnterpriseType,
    amounts?: Amount[],
    employees?: EmployeeType[],
}