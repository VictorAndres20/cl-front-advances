import AuthWrapper from "../hoc/auth_wrapper";
import LoginPage from "./login";
import { advance_path, content_path, history_path, login_page_path } from "./path_pages";
import AdvancePage from "./user/advance";
import HistoryPage from "./user/history";
import UserTemplate from "./user/user_template";

export const router_pages = [
    { 
        path: `${login_page_path.path}`, 
        component: LoginPage, 
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