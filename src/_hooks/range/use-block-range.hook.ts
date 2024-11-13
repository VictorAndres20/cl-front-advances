import { message } from "antd";
import { blockRangeEvent } from "../../_events/range/create.event";

export const useBlockRange = () => {

    const block = (id: string, reload: Function) => {
        blockRangeEvent(id)
        .then(() => {
            reload();
        })
        .catch(err => {
            message.error(err.message);
        });
    }

    return {
        block
    }
}