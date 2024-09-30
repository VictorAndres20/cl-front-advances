import { useState } from "react"
import { AdvancePeriodType } from "../../_events/advance_period/type"
import { buildEmptyAdvancePeriod, buildAdvancePeriod } from "../../_events/advance_period/model"
import { useQuery } from "../../_utils/url_query_hook"
import { createAdvancePeriodEvent } from "../../_events/advance_period/create.event"
import { message } from "antd"

export const useCreatePeriod = () => {
    
    const query = useQuery();
    const [entity, setEntity] = useState<AdvancePeriodType>(buildEmptyAdvancePeriod());
    const [loading, setLoading] = useState<boolean>(false);

    const createPeriod = () => {
        setLoading(true);
        createAdvancePeriodEvent(buildAdvancePeriod(
            entity, 
            Number(query.get('enterprise')) ?? 0, 
            query.get('period') ?? ''))
        .then(_json => {
            setLoading(false);
            message.success("Periodo finalizado");
        })
        .catch(err => {
            setLoading(false);
            message.error(err.message);
        })
    };

    return {
        entity,
        loading,
        setEntity,
        createPeriod
    }
}