import { useState } from "react"
import { AdvancePeriodType } from "../../_events/advance_period/type"
import { buildEmptyAdvancePeriod, buildAdvancePeriod } from "../../_events/advance_period/model"
import { createAdvancePeriodEvent } from "../../_events/advance_period/create.event"
import { message } from "antd"

export const useCreatePeriod = () => {

    const [entity, setEntity] = useState<AdvancePeriodType>(buildEmptyAdvancePeriod());
    const [loading, setLoading] = useState<boolean>(false);

    const createPeriod = (enterprise?: number, period?: string, reload?: () => void) => {
        if(!enterprise) message.error("Enterprise not found");
        else if(!period) message.error("Period not found");
        else {
            setLoading(true);
            createAdvancePeriodEvent(buildAdvancePeriod(
                entity, 
                enterprise, 
                period))
            .then(_json => {
                setLoading(false);
                message.success("Periodo finalizado");
                reload?.();
            })
            .catch(err => {
                setLoading(false);
                message.error(err.message);
            });
        }
    };

    return {
        entity,
        loading,
        setEntity,
        createPeriod
    }
}