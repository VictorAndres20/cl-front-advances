import { useState } from "react"
import { buildEmptyEnterprise } from "../../_events/enterprise/model"
import { createEnterpriseEvent } from "../../_events/enterprise/create.event";
import { message } from "antd";

export const useCreateEnterprise = (reload = () => {}) => {

    const [ entity, setEntity ] = useState(buildEmptyEnterprise());
    const [ loading, setLoading ] = useState(false);

    const create = () => {
        setLoading(true);
        createEnterpriseEvent(entity)
        .then(() => {
            message.success("Creado");
            setEntity(buildEmptyEnterprise());
            setLoading(false);
            reload();
        })
        .catch(err => {
            message.error(err.message);
            setLoading(false);
        });
    }

    return {
        loading, entity, setEntity, create
    }
}