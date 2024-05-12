import { Col, Pagination } from "antd";
import { useFindAllAdvancesPagedByEmployee } from "../../../_hooks/advance/useFindAllAdvancesPagedByEmployee.hook";
import { AdvanceType } from "../../../_events/advance/type";
import { DollarOutlined, CloseCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useDownloadAdvancePdf } from "../../../_hooks/advance/useDownloadAdvancePdf.hook";

const fontSize = '0.8em';

export default function InfoAdvances(){

    const dataHook = useFindAllAdvancesPagedByEmployee();
    const pdf = useDownloadAdvancePdf();

    const renderState = (advance: AdvanceType) => {
        if(typeof advance.state === 'object'){
            const state = advance.state?.cod
            if(state === 'PEND'){
                return(
                    <div className="flex-col flex-center" style={{ width: '100%' }}>
                        <div style={{ fontSize, fontWeight: 'bold' }}>
                            Transferencia
                        </div>
                        <div style={{ fontSize, fontWeight: 'bold' }}>
                            PENDIENTE
                        </div>
                        <ClockCircleOutlined style={{ fontSize: '2em', marginTop: '10px' }} />
                        <div style={{ fontSize, marginTop: '10px' }}>
                            Solicitado correctamente
                        </div>
                        <div style={{ fontSize: '0.7em', marginTop: '2px' }}>
                            En 24h máximo se realizará
                        </div>
                        <div style={{ fontSize: '0.7em', marginTop: '2px' }}>
                            la transferencia del dinero
                        </div>
                    </div>
                );
            } else if(state === 'APPR'){
                return(
                    <div className="flex-col flex-center" style={{ width: '100%' }}>
                        <div style={{ fontSize, fontWeight: 'bold' }}>
                            Transferencia
                        </div>
                        <div style={{ fontSize, fontWeight: 'bold' }}>
                            REALIZADA
                        </div>
                        <DollarOutlined style={{ fontSize: '2em', marginTop: '10px' }} /> 
                        <div style={{ fontSize, marginTop: '10px' }}>
                            {typeof advance.approved_date === 'string' ? new Date(advance.approved_date).toLocaleString('en-US', { timeZone: 'America/Bogota' }).split(",")[0] : ''}
                        </div>
                        <div style={{ fontSize }}>
                            {typeof advance.approved_date === 'string' ? new Date(advance.approved_date).toLocaleString('en-US', { timeZone: 'America/Bogota' }).split(",")[1] : ''}
                        </div>
                    </div>
                );
            } else if(state === 'DECL'){
                return(
                    <div className="flex-col flex-center" style={{ width: '100%' }}>
                        <div style={{ fontSize, fontWeight: 'bold' }}>
                            Transferencia
                        </div>
                        <div style={{ fontSize, fontWeight: 'bold' }}>
                            RECHAZADA
                        </div>
                        <CloseCircleOutlined style={{ fontSize: '2em', marginTop: '10px' }} />
                        <div style={{ fontSize, marginTop: '10px' }}>
                            {typeof advance.declined_date === 'string' ? new Date(advance.declined_date).toLocaleString('en-US', { timeZone: 'America/Bogota' }).split(",")[0] : ''}
                        </div>
                        <div style={{ fontSize }}>
                            {typeof advance.declined_date === 'string' ? new Date(advance.declined_date).toLocaleString('en-US', { timeZone: 'America/Bogota' }).split(",")[1] : ''}
                        </div>
                    </div>
                );
            }
            
        }
        return(<></>);
    }

    return(
        <Col lg={24} xs={24}>
            <Pagination current={dataHook.page + 1} total={dataHook.data.total} pageSize={dataHook.limit} 
                onChange={(p) => {
                    dataHook.setPage(p - 1);
                }}
            />
            {
                dataHook.data.list.length === 0 ?
                    <div>Sin adelantos solicitados</div>
                :
                dataHook.data.list.map((advance, key) => {
                    return(
                        <div className="flex-row flex-center" style={{ width: '96%', margin: '10px 0', padding: '5px 0' }} key={`advance_history_${key}`}>
                            <div className="flex-col flex-center" style={{ width: '40%', backgroundColor: '#C1C6D3', padding: '5px 0px', height: '120px', borderRadius: '15px' }}>
                                <div style={{ fontSize, fontWeight: 'bold', marginBottom: '10px' }}>
                                    Anticipo Solicitado
                                </div>
                                <div style={{ fontSize }}>
                                    Valor: {advance.value}
                                </div>
                                <div style={{ fontSize }}>
                                    Costo: {advance.cost}
                                </div>
                                <div style={{ fontSize, marginTop: '10px' }}>
                                    {typeof advance.created_date === 'string' ? new Date(advance.created_date).toLocaleString('en-US', { timeZone: 'America/Bogota' }).split(",")[0] : ''}
                                </div>
                                <div style={{ fontSize }}>
                                    {typeof advance.created_date === 'string' ? new Date(advance.created_date).toLocaleString('en-US', { timeZone: 'America/Bogota' }).split(",")[1] : ''}
                                </div>
                                <div style={{ cursor: 'pointer', fontSize: '0.7em', color: 'blue', textDecoration: 'underline', marginTop: '10px' }}
                                    onClick={() => {
                                        pdf.download(advance.uuid ?? '')
                                    }}
                                >
                                    comprobante
                                </div>
                            </div>
                            <div style={{ backgroundColor: '#658F9C', width: '40%', padding: '5px 0px', height: '120px', borderRadius: '15px', color: 'white' }}>
                                {renderState(advance)}
                            </div>
                        </div>
                    );
                })
            }
            <Pagination current={dataHook.page + 1} total={dataHook.data.total} pageSize={dataHook.limit}
                onChange={(p) => {
                    dataHook.setPage(p - 1);
                }}
                style={{ marginBottom: '30px' }}
            />
        </Col>
    );
}