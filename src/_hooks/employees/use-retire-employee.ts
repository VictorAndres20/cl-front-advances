import { message } from "antd";
import { retireEmployeeEvent } from "../../_events/employee/create.event"

export const useRetireEmployee = () => {

    const retire = (body: any, reload: Function) => {
        retireEmployeeEvent(body)
        .then(() => {
            reload();
        })
        .catch(err => {
            message.error(err.message);
        });
    }

    return {
        retire
    }
}