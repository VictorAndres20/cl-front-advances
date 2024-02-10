import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enterprises_path } from "../../pages/path_pages";
import { loginUserEvent } from "../../_events/login/login.event";
import { message } from "antd";
import { baseEntity } from '../../_events/login/login.event';
import { roles } from "../../_config/roles";
import { LoginType } from "../../_events/login/type";


export const useLoginUser = () => {

    const navigate = useNavigate();

    const [ entity, setEntity ] = useState<LoginType>({...baseEntity});

    const login = () => {
        loginUserEvent(entity)
        .then(json => {
            if(json.data.rol === roles.root) navigate(enterprises_path.full_path);
        })
        .catch(err => {
            message.error(err.message);
        });
    }

    return {
        entity, setEntity, login
    }
}