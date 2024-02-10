import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { advance_path } from "../../pages/path_pages";
import { loginEvent, baseEntity } from "../../_events/login/login.event";
import { message } from "antd";
import { LoginType } from "../../_events/login/type";


export const useLogin = () => {

    const navigate = useNavigate();

    const [ entity, setEntity ] = useState<LoginType>({...baseEntity});

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