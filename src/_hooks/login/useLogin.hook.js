import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { advance_path, login_page_path } from "../../pages/path_pages";
import { loginEvent } from "../../_events/login/login.event";
import { message } from "antd";
import { baseEntity } from '../../_events/login/login.event';


export const useLogin = () => {

    const navigate = useNavigate();

    const [ entity, setEntity ] = useState({...baseEntity});

    const login = () => {
        loginEvent(entity)
        .then(() => {
            navigate(advance_path.full_path);
        })
        .catch(err => {
            message.error(err.message);
        });
    }

    return {
        entity, setEntity, login
    }
}