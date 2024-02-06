import { useNavigate } from "react-router-dom";
import { cleanValues } from "../../_utils/storage_handler";
import { login_page_path } from "../../pages/path_pages";

export const useLogout = () => {

    const navigate = useNavigate();

    const logout = () => {
        cleanValues();
        navigate(login_page_path.full_path);
    }

    return {
        logout
    }
}