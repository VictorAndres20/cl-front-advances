import { useState } from "react"
import { createRangeEvent } from "../../_events/range/create.event";
import { message } from "antd";
import { buildRangeWithLoggedEnterprise } from "../../_events/range/model";
import { RangeType } from "../../_events/range/type";

export const useCreateRange = (reload: Function = () => {}) => {

    const [ entity, setEntity ] = useState<RangeType>(buildRangeWithLoggedEnterprise());
    const [ loading, setLoading ] = useState<boolean>(false);

    const cleanEntity = () => {
        setEntity(buildRangeWithLoggedEnterprise());
    }

    const create = () => {
        setLoading(true);
        createRangeEvent(entity)
        .then(() => {
            message.success("Creado");
            cleanEntity();
            setLoading(false);
            reload();
        })
        .catch((err) => {
            message.error(err.message);
            setLoading(false);
        });
    }

    return {
        loading, entity, setEntity, create, cleanEntity
    }
}