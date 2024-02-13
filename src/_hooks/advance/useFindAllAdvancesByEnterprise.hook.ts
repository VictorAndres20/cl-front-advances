import { useEffect, useState } from "react"
import { findAllAdvanceByEnterpriseEvent } from "../../_events/advance/find.event";
import { message } from "antd";
import { AdvanceType } from "../../_events/advance/type";

export const useFindAllAdvancesByEnterprise = (enterprise: number) => {

    const [ data, setData ] = useState<AdvanceType[]>([]);

    const loadData = (enterpriseParam: number) => {
        findAllAdvanceByEnterpriseEvent(enterpriseParam)
        .then(json => {
            setData(json.list);
        })
        .catch(err => {
            message.error(err.message);
        })
    }

    useEffect(() => {
        loadData(enterprise);
    }, [enterprise]);

    return{
        data, loadData
    }
}