import { useState } from "react"
import { editAmountEvent } from "../../_events/amount/create.event";
import { message } from "antd";
import { findAmountByIdEvent } from "../../_events/amount/find.event";
import { buildEmptyAmount, transformEntityAmount } from "../../_events/amount/model";
import { Amount } from "../../_events/amount/type";

export const useUpdateAmount = (reload: Function = () => {}) => {

    const [ entity, setEntity ] = useState<Amount>(buildEmptyAmount());
    const [ loading, setLoading ] = useState<boolean>(false);

    const update = (id: string) => {
        setLoading(true);
        editAmountEvent(id, entity)
        .then(() => {
            message.success("Actualizado");
            setLoading(false);
            reload();
        })
        .catch(err => {
            message.error(err.message);
            setLoading(false);
        });
    }

    const loadEntity = (id: any) => {
        setLoading(true);
        findAmountByIdEvent(id)
        .then(json => {
            setEntity(transformEntityAmount(json.data));
            setLoading(false);
        })
        .catch(err => {
            message.error(err.message);
            setLoading(false);
        });
    }

    return {
        loading, entity, setEntity, update, loadEntity
    }
}