import AuthWrapper from "../hoc/auth_wrapper";
import AdminTemplate from "./admin/admin_template";
import AdvancesPage from "./admin/advances";
import AdvancesInboxPage from "./admin/advances_inbox";
import EmployeesPage from "./admin/employees";
import EnterprisesPage from "./admin/enterprises";
import LoginAdminPage from "./admin/login";
import RangesPage from "./admin/ranges";
import UsersPage from "./admin/users";
import LoginPage from "./login";
import { admin_path, advance_path, advances_inbox_path, advances_path, content_path, employees_path, enterprises_path, history_path, login_admin_path, login_page_path, ranges_path, users_path } from "./path_pages";
import AdvancePage from "./user/advance";
import HistoryPage from "./user/history";
import UserTemplate from "./user/user_template";

interface RouterPage {
    path: string,
    component: React.FC | React.ComponentClass,
    children?: RouterPage[]
}

export const router_pages: RouterPage[] = [
    { 
        path: `${login_page_path.path}`, 
        component: LoginPage, 
    },
    {
        path: `${login_admin_path.path}`, 
        component: LoginAdminPage, 
    },
    { 
        path: `${admin_path.path}`, 
        component: AuthWrapper(AdminTemplate),
        children: [
            {
                path: `${enterprises_path.path}`, 
                component: EnterprisesPage,
            },
            {
                path: `${users_path.path}`, 
                component: UsersPage,
            },
            {
                path: `${ranges_path.path}`, 
                component: RangesPage,
            },
            {
                path: `${employees_path.path}`, 
                component: EmployeesPage,
            },
            {
                path: `${advances_inbox_path.path}`, 
                component: AdvancesInboxPage,
            },
            {
                path: `${advances_path.path}`, 
                component: AdvancesPage,
            },
        ],
   }, 
    { 
        path: `${content_path.path}`, 
        component: AuthWrapper(UserTemplate),
        children: [
            {
                path: `${advance_path.path}`, 
                component: AdvancePage,
            },
            {
                path: `${history_path.path}`, 
                component: HistoryPage,
            },
        ],
   }, 
];