import { useEffect, useState } from "react"
import { AdvanceType } from "../../_events/advance/type";
import { getUserId } from "../../_utils/storage_handler";
import { findAllAdvanceByEmployeePagedEvent } from "../../_events/advance/find.event";
import { message } from "antd";

export interface AdvancePagedType {
    list: AdvanceType[], 
    total: number
}

export interface FindAllAdvancePagedByEmployeeHook {
    data: AdvancePagedType, 
    page: number, 
    setPage: ((page: number) => void)
}

export const useFindAllAdvancesPagedByEmployee = (): FindAllAdvancePagedByEmployeeHook => {

    const employee = getUserId();
    const [ data, setData ] = useState<AdvancePagedType>({ list: [], total: 0 });
    const [ page, setPage ] = useState<number>(0);
    const limit = 8;

    useEffect(() => {
        findAllAdvanceByEmployeePagedEvent(page, limit, employee ?? '')
        .then(json => {
            setData({
                list: json.paged[0],
                total: json.paged[1]
            });
        })
        .catch(err => {
            message.error(err.message);
        });
    }, [page, limit, employee]);


    return{
        data, page, setPage
    }
}