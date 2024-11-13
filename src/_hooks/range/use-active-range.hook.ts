import { message } from "antd";
import { activateRangeEvent } from "../../_events/range/create.event";

export const useActivateRange = () => {

    const activate = (id: string, reload: Function) => {
        activateRangeEvent(id)
        .then(() => {
            reload();
        })
        .catch(err => {
            message.error(err.message);
        });
    }

    return {
        activate
    }
}