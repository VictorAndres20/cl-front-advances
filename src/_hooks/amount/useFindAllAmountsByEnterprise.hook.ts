import { useEffect, useState } from "react"
import { findAllAmountByEnterpriseEvent } from "../../_events/amount/find.event";
import { message } from "antd";
import { RangeType } from "../../_events/range/type";

export const useFindAllAmountsByEnterprise = (enterprise: number) => {

    const [ data, setData ] = useState<RangeType[]>([]);

    const loadData = (enterpriseParam: number) => {
        findAllAmountByEnterpriseEvent(enterpriseParam)
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