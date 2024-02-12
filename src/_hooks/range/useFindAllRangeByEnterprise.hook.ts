import { useEffect, useState } from "react"
import { findAllRangeByEnterpriseEvent } from "../../_events/range/find.event";
import { message } from "antd";
import { RangeType } from "../../_events/range/type";

export const useFindAllRangeByEnterprise = (enterprise: number) => {

    const [ data, setData ] = useState<RangeType[]>([]);

    const loadData = (enterpriseParam: number) => {
        findAllRangeByEnterpriseEvent(enterpriseParam)
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