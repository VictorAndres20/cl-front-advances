import { roles } from "../_config/roles";
import { 
    enterprises_path, 
    users_path,
    ranges_path,
    amounts_path,
    employees_path,
    bulk_employees_path,
    messages_path,
    bank_messages_path,
    advances_inbox_path,
    advances_path,
} from "./path_pages";

export const roles_paths = {
    [enterprises_path.full_path]: [roles.root],
    [users_path.full_path]: [roles.root],
    [ranges_path.full_path]: [roles.root],
    [amounts_path.full_path]: [roles.root],
    [employees_path.full_path]: [roles.root, roles.admin],
    [bulk_employees_path.full_path]: [roles.root, roles.admin],
    [messages_path.full_path]: [roles.root],
    [bank_messages_path.full_path]: [roles.root],
    [advances_inbox_path.full_path]: [roles.root],
    [advances_path.full_path]: [roles.root, roles.admin],
}