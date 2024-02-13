import { useState } from "react"
import { createAmountEvent } from "../../_events/amount/create.event";
import { message } from "antd";
import { buildEmptyAmount } from "../../_events/amount/model";
import { Amount } from "../../_events/amount/type";

export const useCreateAmount = (reload: Function = () => {}) => {

    const [ entity, setEntity ] = useState<Amount>(buildEmptyAmount());
    const [ loading, setLoading ] = useState<boolean>(false);

    const cleanEntity = () => {
        setEntity(buildEmptyAmount());
    }

    const create = () => {
        setLoading(true);
        createAmountEvent(entity)
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