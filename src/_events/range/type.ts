import { EmployeeType } from "../employee/type";
import { EnterpriseType } from "../enterprise/type";
import { RangeAmountType } from "../range_amount/type";

export interface RangeType {
    uuid: string,
    id: string,
    enterprise?: number | EnterpriseType,
    amounts?: RangeAmountType[],
    employees?: EmployeeType[],
}