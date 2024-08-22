import { useState } from "react"
import { editMessagesEvent } from "../../_events/messages/create.event";
import { message } from "antd";
import { findMessagesByIdEvent } from "../../_events/messages/find.event";
import { Messages } from "../../_events/messages/type";
import { buildEmptyMessages, transformEntityMessages } from "../../_events/messages/model";
import { getCompany } from "../../_utils/storage_handler";

export interface UpdateMessagesHook {
    loading: boolean, 
    entity: Messages,
    setEntity: ((data: Messages) => void), 
    update: ((id: any) => void),
    loadEntity: ((id: string) => void),
}

export const useUpdateMessages = (reload: Function = () => {}): UpdateMessagesHook => {

    const [ entity, setEntity ] = useState<Messages>(buildEmptyMessages());
    const [ loading, setLoading ] = useState<boolean>(false);

    const update = (id: string) => {
        setLoading(true);
        editMessagesEvent(id, entity)
        .then(() => {
            message.success("Actualizado");
            setLoading(false);
            reload(getCompany());
        })
        .catch(err => {
            message.error(err.message);
            setLoading(false);
        });
    }

    const loadEntity = (id: string) => {
        setLoading(true);
        findMessagesByIdEvent(id)
        .then(json => {
            setEntity(transformEntityMessages(json.data));
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