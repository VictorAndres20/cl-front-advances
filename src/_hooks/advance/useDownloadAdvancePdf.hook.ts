import { downloadFile } from "../../_utils/download_file.util";
import { useAdvancePdfById } from "./useAdvancePdfById.hook"

export const useDownloadAdvancePdf = () => {

    const pdf = useAdvancePdfById();

    const download = (id: string) => {
        pdf.loadPdf(id, (bytes) => {
            downloadFile(bytes, `solicitud_${new Date().toISOString()}`);
        });
    }

    return {
        download
    }
}