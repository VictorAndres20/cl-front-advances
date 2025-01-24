import { message } from "antd";
import { unretireEmployeeEvent } from "../../_events/employee/create.event"

export const useUnretireEmployee = () => {

    const unretire = (body: any, reload: Function) => {
        unretireEmployeeEvent(body)
        .then(() => {
            reload();
        })
        .catch(err => {
            message.error(err.message);
        });
    }

    return {
        unretire
    }
}