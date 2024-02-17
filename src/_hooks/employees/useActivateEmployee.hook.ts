import { message } from "antd";
import { activateEmployeeEvent } from "../../_events/employee/create.event"

export const useActivateEmployee = () => {

    const activate = (id: string, reload: Function) => {
        activateEmployeeEvent(id)
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