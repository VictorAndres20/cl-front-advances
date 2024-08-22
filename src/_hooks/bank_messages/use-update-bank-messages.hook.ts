import { useState } from "react"
import { editBankMessagesEvent } from "../../_events/bank_messages/create.event";
import { message } from "antd";
import { findBankMessagesByIdEvent } from "../../_events/bank_messages/find.event";
import { BankMessages } from "../../_events/bank_messages/type";
import { buildEmptyBankMessages, transformEntityBankMessages } from "../../_events/bank_messages/model";
import { getCompany } from "../../_utils/storage_handler";

export interface UpdateBankMessagesHook {
    loading: boolean, 
    entity: BankMessages,
    setEntity: ((data: BankMessages) => void), 
    update: ((id: any) => void),
    loadEntity: ((id: string) => void),
}

export const useUpdateBankMessages = (reload: Function = () => {}): UpdateBankMessagesHook => {

    const [ entity, setEntity ] = useState<BankMessages>(buildEmptyBankMessages());
    const [ loading, setLoading ] = useState<boolean>(false);

    const update = (id: string) => {
        setLoading(true);
        editBankMessagesEvent(id, entity)
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
        findBankMessagesByIdEvent(id)
        .then(json => {
            setEntity(transformEntityBankMessages(json.data));
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