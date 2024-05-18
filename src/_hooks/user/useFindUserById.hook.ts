import { useEffect, useState } from "react";
import { UserType } from "../../_events/user/type";
import { findUserByIdEvent } from "../../_events/user/find.event";
import { message } from "antd";
import { buildEmptyUser } from "../../_events/user/model";
import { getUserId } from "../../_utils/storage_handler";

export const useFindUserById = () => {

    const [ data, setData ] = useState<UserType>(buildEmptyUser());

    const loadUser = (id: string) => {
        findUserByIdEvent(id)
        .then(json => {
            setData(json.data);
        })
        .catch(err => {
            message.error(err.message);
        });
    }

    useEffect(() => {
        loadUser(getUserId() ?? '');
    }, []);

    return {
        data, loadUser
    };
}