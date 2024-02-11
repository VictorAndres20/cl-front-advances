import { useEffect, useState } from "react";
import { UserType } from "../../_events/user/type";
import { findAllUserEvent } from "../../_events/user/find.event";
import { message } from "antd";

export const useFindAllUsers = () => {

    const [ data, setData ] = useState<UserType[]>([]);

    const loadData = () => {
        findAllUserEvent()
        .then(json => {
            setData(json.list);
        })
        .catch(err => {
            message.error(err.message);
        });
    }

    useEffect(() => {
        loadData();
    }, []);

    return {
        data, loadData
    };
}