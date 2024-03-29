import { useState } from "react"
import { buildEmptyEnterprise } from "../../_events/enterprise/model"
import { createEnterpriseEvent } from "../../_events/enterprise/create.event";
import { EnterpriseType } from "../../_events/enterprise/type";
import { message } from "antd";

export const useCreateEnterprise = (reload: Function = () => {}) => {

    const [ entity, setEntity ] = useState<EnterpriseType>(buildEmptyEnterprise());
    const [ loading, setLoading ] = useState<boolean>(false);

    const cleanEntity = () => {
        setEntity(buildEmptyEnterprise());
    }

    const create = () => {
        setLoading(true);
        createEnterpriseEvent(entity)
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