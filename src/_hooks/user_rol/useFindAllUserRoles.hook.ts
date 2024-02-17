import { useEffect, useState } from "react"
import { UserRolType } from "../../_events/user_rol/type";
import { findAllUserRolEvent } from "../../_events/user_rol/find.event";

export const useFindAllUserRoles = () => {

    const [ data, setData ] = useState<UserRolType[]>([]);

    useEffect(() => {
        findAllUserRolEvent()
        .then(json => {
            setData(json.list);
        })
        .catch((err: any) => {

        });
    }, []);

    return {
        data
    }
}