import { useState } from "react"
import { buildEmptyEnterprise } from "../../_events/enterprise/model"
import { editEnterpriseEvent } from "../../_events/enterprise/create.event";
import { message } from "antd";
import { findEnterpriseByIdEvent } from "../../_events/enterprise/find.event";

export const useUpdateEnterprise = (reload: Function = () => {}) => {

    const [ entity, setEntity ] = useState(buildEmptyEnterprise());
    const [ loading, setLoading ] = useState(false);

    const update = (id: any) => {
        setLoading(true);
        editEnterpriseEvent(id, entity)
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
        findEnterpriseByIdEvent(id)
        .then(json => {
            setEntity(json.data);
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