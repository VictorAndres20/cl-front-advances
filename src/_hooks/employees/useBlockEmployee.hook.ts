import { message } from "antd";
import { blockEmployeeEvent } from "../../_events/employee/create.event"

export const useBlockEmployee = () => {

    const block = (id: string, reload: Function) => {
        blockEmployeeEvent(id)
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