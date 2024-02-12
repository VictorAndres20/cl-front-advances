import { useState } from "react"
import { editRangeEvent } from "../../_events/range/create.event";
import { message } from "antd";
import { findRangeByIdEvent } from "../../_events/range/find.event";
import { buildEmptyRange, transformEntityRange } from "../../_events/range/model";
import { RangeType } from "../../_events/range/type";

export const useUpdateRange = (reload: Function = () => {}) => {

    const [ entity, setEntity ] = useState<RangeType>(buildEmptyRange());
    const [ loading, setLoading ] = useState<boolean>(false);

    const update = (id: string) => {
        setLoading(true);
        editRangeEvent(id, entity)
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
        findRangeByIdEvent(id)
        .then(json => {
            setEntity(transformEntityRange(json.data));
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