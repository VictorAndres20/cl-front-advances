import { useState } from "react"
import { resetLimitDateEnterpriseEvent } from "../../_events/enterprise/create.event";
import { message } from "antd";

export const useResetLimitDateEnterprise = (reload?: () => void) => {

    const [loading, setLoading] = useState(false);

    const resetLimitDate = (id: number) => {
        setLoading(true);
        resetLimitDateEnterpriseEvent(id)
        .then(_ => {
            message.success('Fecha de tope reiniciada');
            reload?.();
            setLoading(false);
        })
        .catch(err => {
            message.error((err as Error).message);
            setLoading(false);
        });
    }

    return {
        loading,
        resetLimitDate
    }
}