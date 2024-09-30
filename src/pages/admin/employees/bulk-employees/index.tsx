import { Col, Row, message, Upload, Button } from "antd";
import type { GetProp, UploadProps } from 'antd';
import AdminTitle from "../../../../widgets /titles/admin_title";
import Table from "./table";
import DownloadEmployeesTemplate from "./download-employees-template";
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { useCallback, useState } from "react";
import { EmployeeExcelType } from "../../../../_events/employee/type";
import { readEmployeesExcelEvent } from "../../../../_events/employee/find.event";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
type CustomRequestEvent = Parameters<GetProp<UploadProps, 'customRequest'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
    const isValidFile = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if (!isValidFile) {
        message.error('Archivo cargado no es un excel (XLSX)');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('El archivo debe ser menor a 2MB');
    }

    return isValidFile && isLt2M;
};

export default function BulkEmployeesPage(){

    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState<EmployeeExcelType[]>([]);

    const removeEmployee = useCallback((index: number, employees: EmployeeExcelType[]) => {
        console.log(employees);
        console.log(index);
        const newEmployees = [...employees];
        newEmployees.splice(index, 1);
        console.log(newEmployees);
        setEmployees([...newEmployees]);
    }, [])

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'error') {
            setLoading(false);
            return;
        }

        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as FileType, (url) => {
                const bytes = url;
                const bytesParts = bytes.split(",");
                if(bytesParts.length !== 2){
                    message.error("Bytes not found");
                    setLoading(false);
                } else {
                    readEmployeesExcelEvent(bytesParts[1])
                    .then(json => {
                        setLoading(false);
                        setEmployees(json.list);
                    })
                    .catch(error => {
                        setLoading(false);
                        message.error(error.message);
                    });
                }
            });
        }
    };

    const uploadButton = (
        <Button 
            style={{ marginRight: '10px' }} 
            icon={loading ? <LoadingOutlined /> : <UploadOutlined />}
        >
            Cargar archivo excel
        </Button>
    );

    return(
        <Row>
            <Col lg={24} xs={24}>
                <AdminTitle text={'Importar empleados'} />
                <div style={{ width: '90%', display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                    <Upload
                        name="avatar"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        customRequest={(e: CustomRequestEvent) => {e?.onSuccess?.("ok");}}
                        onChange={handleChange}
                    >
                        {uploadButton}
                    </Upload>
                    <DownloadEmployeesTemplate />
                </div>
                <Table removeEmployee={removeEmployee} employees={employees} />
            </Col>
        </Row>
    );
}