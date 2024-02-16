import { message } from "antd";
import { approveAdvanceEvent } from "../../_events/advance/create.event"

export const useApproveAdvance = () => {

    const approve = (id: string, reload: Function) => {
        approveAdvanceEvent(id)
        .then(() => {
            reload();
        })
        .catch(err => {
            message.error(err.message);
        });
    }

    return {
        approve
    }
}