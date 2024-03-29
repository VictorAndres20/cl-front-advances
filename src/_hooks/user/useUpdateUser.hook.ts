import { useState } from "react"
import { message } from "antd";
import { buildEmptyUser, transformEntityUser } from "../../_events/user/model";
import { UserType } from "../../_events/user/type";
import { editPasswordUserEvent, editUserEvent } from "../../_events/user/create.event";
import { findUserByIdEvent } from "../../_events/user/find.event";

export interface UpdateUserHook {
    loading: boolean, 
    entity: UserType, 
    setEntity: ((data: UserType) => void), 
    update: ((id: any) => void), 
    loadEntity: ((id: string) => void), 
    updatePassword: ((id: string) => void)
}

export const useUpdateUser = (reload: Function = () => {}): UpdateUserHook => {

    const [ entity, setEntity ] = useState<UserType>(buildEmptyUser());
    const [ loading, setLoading ] = useState(false);

    const update = (id: any) => {
        setLoading(true);
        editUserEvent(id, entity)
        .then(() => {
            message.success("Actualizado");
            setLoading(false);
            reload();
        })
        .catch(err => {
            message.error(err.message);
            setLoading(false);
        });
    }

    const updatePassword = (id: string) => {
        setLoading(true);
        editPasswordUserEvent(id, entity)
        .then(() => {
            message.success("Actualizado");
            setLoading(false);
        })
        .catch(err => {
            message.error(err.message);
            setLoading(false);
        });
    }

    const loadEntity = (id: string) => {
        setLoading(true);
        findUserByIdEvent(id)
        .then(json => {
            setEntity(transformEntityUser(json.data));
            setLoading(false);
        })
        .catch(err => {
            message.error(err.message);
            setLoading(false);
        });
    }

    return {
        loading, entity, setEntity, update, loadEntity, updatePassword
    }
}