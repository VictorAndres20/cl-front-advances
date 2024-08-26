import { useEffect, useState } from "react"
import { findAllAmountByEnterpriseEvent, findAllAmountEvent } from "../../_events/amount/find.event";
import { message } from "antd";
import { RangeType } from "../../_events/range/type";
import { roles } from "../../_config/roles";

export const useAmountsByRol = (rol: string, enterprise: number) => {

    const [ data, setData ] = useState<RangeType[]>([]);

    const loadData = (enterpriseParam: number) => {
        if(rol === roles.root){
            findAllAmountEvent()
            .then(json => {
                setData(json.list);
            })
            .catch(err => {
                message.error(err.message);
            });
        } else {
            findAllAmountByEnterpriseEvent(enterpriseParam)
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