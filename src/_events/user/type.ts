import { EnterpriseType } from "../enterprise/type";
import { UserRolType } from "../user_rol/type";

export interface UserType {
    uuid: string,
    name: string,
    email: string,
    login: string,
    password?: string,
    active: number,
    enterprise?: number | EnterpriseType,
    rol?: string | UserRolType,
}