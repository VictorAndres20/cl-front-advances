import { FileExcelOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { openNewTab } from "../../../../_utils/download_file.util";
import { EMPLOYEES_EXCEL_TEMPLATE_URL } from "../../../../_config/api";

export default function DownloadEmployeesTemplate(){
    return(
        <Button onClick={() => openNewTab(EMPLOYEES_EXCEL_TEMPLATE_URL)} icon={<FileExcelOutlined />} type="primary">
            Descargar plantilla excel
        </Button>
    )
} 