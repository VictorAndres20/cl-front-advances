import { useEffect, useState } from "react"
import { findAllRangeByEnterpriseEvent, findAllRangeEvent } from "../../_events/range/find.event";
import { message } from "antd";
import { RangeType } from "../../_events/range/type";
import { roles } from "../../_config/roles";

export const useRangesByRol = (rol: string, enterprise: number) => {

    const [ data, setData ] = useState<RangeType[]>([]);

    const loadData = (enterpriseParam: number) => {
        if(rol === roles.root){
            findAllRangeEvent()
            .then(json => {
                setData(json.list);
            })
            .catch(err => {
                message.error(err.message);
            });
        } else {
            findAllRangeByEnterpriseEvent(enterpriseParam)
            .then(json => {
                setData(json.list);
            })
            .catch(err => {
                message.error(err.message);
            });
        }
    }

    useEffect(() => {
        loadData(enterprise);
    }, [enterprise]);

    return{
        data, loadData
    }
}