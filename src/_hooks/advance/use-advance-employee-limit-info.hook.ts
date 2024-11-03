import { useCallback, useEffect, useState } from "react"
import { getEmployeeAdvanceLimitInfoByEmployeeIdEvent } from "../../_events/advance/find.event";
import { message } from "antd";
import { AdvanceLimitInfo } from "../../_events/advance/type";

export const useAdvanceEmployeeLimitInfo = (id: string) => {

    const [data, setData] = useState<AdvanceLimitInfo | null>(null);
    const [loading, setLoading] = useState(false);

    const loadData = useCallback(() => {
        setLoading(true);
        getEmployeeAdvanceLimitInfoByEmployeeIdEvent(id)
        .then(json => {
            setData(json.data);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            message.error(err.message);
        })
    }, [id]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return {
        data,
        loading
    }
}