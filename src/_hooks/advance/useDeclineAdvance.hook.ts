import { message } from "antd";
import { declineAdvanceEvent } from "../../_events/advance/create.event"

export const useDeclineAdvance = () => {

    const decline = (id: string, reload: Function) => {
        declineAdvanceEvent(id)
        .then(() => {
            reload();
        })
        .catch(err => {
            message.error(err.message);
        });
    }

    return {
        decline
    }
}