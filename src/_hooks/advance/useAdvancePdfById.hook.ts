import { useState } from "react"
import { pdfAdvanceByIdEvent } from "../../_events/advance/find.event";
import { message } from "antd";

export const useAdvancePdfById = (): { loading: boolean, bytes: string | null, loadPdf: ((id: string, onSuccess?: ((bytes: any) => void)) => void) } => {

    const [ bytes, setBytes ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const loadPdf = (id: string, onSuccess?: ((bytes: any) => void)) => {
        setLoading(true);
        pdfAdvanceByIdEvent(id)
        .then( json => {
            setBytes(json.data);
            if(onSuccess) onSuccess(json.data);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            message.error(err.message);
        });
    }

    return {
        loading,
        bytes,
        loadPdf
    }
}