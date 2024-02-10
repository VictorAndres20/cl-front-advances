import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from "react"
import { buildEmptyEnterprise } from "../../_events/enterprise/model"
import { createEnterpriseEvent } from "../../_events/enterprise/create.event";
import { MessageArgsProps, message } from "antd";
import { EnterpriseType } from "../../_events/enterprise/type";

export const useCreateEnterprise = (reload: Function = () => {}) => {

    const [ entity, setEntity ] = useState<EnterpriseType>(buildEmptyEnterprise());
    const [ loading, setLoading ] = useState<boolean>(false);

    const create = () => {
        setLoading(true);
        createEnterpriseEvent(entity)
        .then(() => {
            message.success("Creado");
            setEntity(buildEmptyEnterprise());
            setLoading(false);
            reload();
        })
        .catch((err: { message: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | MessageArgsProps | null | undefined; }) => {
            message.error(err.message);
            setLoading(false);
        });
    }

    return {
        loading, entity, setEntity, create
    }
}