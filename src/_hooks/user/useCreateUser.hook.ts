import { useState } from "react"
import { message } from "antd";
import { UserType } from "../../_events/user/type";
import { buildEmptyUser } from "../../_events/user/model";
import { createUserEvent } from "../../_events/user/create.event";

export const useCreateUser = (reload: Function = () => {}) => {

    const [ entity, setEntity ] = useState<UserType>(buildEmptyUser());
    const [ loading, setLoading ] = useState<boolean>(false);

    const cleanEntity = () => {
        setEntity(buildEmptyUser());
    }

    const create = () => {
        setLoading(true);
        createUserEvent(entity)
        .then(() => {
            message.success("Creado");
            cleanEntity();
            setLoading(false);
            reload();
        })
        .catch((err) => {
            message.error(err.message);
            setLoading(false);
        });
    }

    return {
        loading, entity, setEntity, create, cleanEntity
    }
}