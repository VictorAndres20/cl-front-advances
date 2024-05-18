import { Col, Pagination, StepProps, Steps } from "antd";
import { useFindAllAdvancesPagedByEmployee } from "../../../_hooks/advance/useFindAllAdvancesPagedByEmployee.hook";
import { AdvanceType } from "../../../_events/advance/type";
import { DollarOutlined, CloseCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useDownloadAdvancePdf } from "../../../_hooks/advance/useDownloadAdvancePdf.hook";

const fontSize = '0.8em';

const titleFontStyle = {
    fontWeight: 'bold',
    fontSize: '0.75em',
}

const secondaryFontStyle = {
    fontSize: '0.65em',
}

export default function InfoAdvances(){

    const dataHook = useFindAllAdvancesPagedByEmployee();
    const pdf = useDownloadAdvancePdf();

    const renderState = (advance: AdvanceType) => {
        let current = 1;
        const steps: StepProps[] = [
            {
              title: '',
              icon: <DollarOutlined style={{ color: 'green' }} />,
            },
            {
              title: '',
              icon: <DollarOutlined style={{ color: 'green' }} />,
            },
        ];

        if(typeof advance.state === 'object'){
            const state = advance.state?.cod
            
            steps[0].title = (
                <div className="flex-col flex-center" style={{ width: '70px' }}>
                    <div style={secondaryFontStyle}>Solicitud</div>
                </div>
            );
            steps[0].description = (
                <div className="flex-col flex-center" style={{ width: '70px' }}>
                    <div style={titleFontStyle}>Recibida</div>
                    <div style={secondaryFontStyle}>{typeof advance.created_date === 'string' ? new Date(advance.created_date).toLocaleString('en-US', { timeZone: 'America/Bogota' }).split(",")[0] : ''}</div>
                    <div style={secondaryFontStyle}>{typeof advance.created_date === 'string' ? new Date(advance.created_date).toLocaleString('en-US', { timeZone: 'America/Bogota' }).split(",")[1] : ''}</div>
                </div>
            );

            steps[1].title = (
                <div className="flex-col flex-center" style={{ width: '70px' }}>
                    <div style={secondaryFontStyle}>Anticipo</div>
                </div>
            );
            steps[1].description = (
                <div className="flex-col flex-center" style={{ width: '70px' }}>
                    <div style={titleFontStyle}>Aprobado</div>
                </div>
            );

            if( state === 'PEND' ){
                steps.push({
                    title: (
                        <div className="flex-col flex-center" style={{ width: '70px' }}>
                            <div style={secondaryFontStyle}>Transferencia</div>
                        </div>
                    ),
                    description: (
                        <div className="flex-col flex-center" style={{ width: '80px' }}>
                            <div style={titleFontStyle}>Pendiente por</div>
                            <div style={titleFontStyle}>Completar</div>
                        </div>
                    ),
                    icon: <ClockCircleOutlined style={{ color: 'orange' }} />,
                })
            }

            if( state === 'APPR' ){
                current = 2;
                steps.push({
                    title: (
                        <div className="flex-col flex-center" style={{ width: '80px' }}>
                            <div style={secondaryFontStyle}>Transferencia</div>
                        </div>
                    ),
                    description: (
                        <div className="flex-col flex-center" style={{ width: '80px' }}>
                            <div style={titleFontStyle}>Completa</div>
                            <div style={secondaryFontStyle}>{typeof advance.approved_date === 'string' ? new Date(advance.approved_date).toLocaleString('en-US', { timeZone: 'America/Bogota' }).split(",")[0] : ''}</div>
                            <div style={secondaryFontStyle}>{typeof advance.approved_date === 'string' ? new Date(advance.approved_date).toLocaleString('en-US', { timeZone: 'America/Bogota' }).split(",")[1] : ''}</div>
                        </div>
                    ),
                    icon: <DollarOutlined style={{ color: 'green' }} />,
                })
            }

            if( state === 'DECL' ){
                current = 2;
                steps.push({
                    title: (
                        <div className="flex-col flex-center" style={{ width: '80px' }}>
                            <div style={secondaryFontStyle}>Transferencia</div>
                        </div>
                    ),
                    description: (
                        <div className="flex-col flex-center" style={{ width: '80px' }}>
                            <div style={titleFontStyle}>Rechazada</div>
                            <div style={secondaryFontStyle}>{typeof advance.approved_date === 'string' ? new Date(advance.approved_date).toLocaleString('en-US', { timeZone: 'America/Bogota' }).split(",")[0] : ''}</div>
                            <div style={secondaryFontStyle}>{typeof advance.approved_date === 'string' ? new Date(advance.approved_date).toLocaleString('en-US', { timeZone: 'America/Bogota' }).split(",")[1] : ''}</div>
                        </div>
                    ),
                    icon: <CloseCircleOutlined />,
                })
            }

            return(
                <Steps 
                    size="small"
                    current={current}
                    items={steps}
                    direction="horizontal"
                    responsive={false}
                    status={state === 'DECL' ? "error" : "finish"}
                />
            );
            
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
                        <div className="flex-col flex-center" style={{ width: '100%', margin: '10px 0', padding: '5px 0' }} key={`advance_history_${key}`}>
                            <div className="flex-col flex-center" style={{ width: '350px', backgroundColor: '#92B9E8', padding: '5px 0px', height: '100px', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                                <div style={{ fontSize, fontWeight: 'bold', marginBottom: '10px' }}>
                                    Anticipo Solicitado
                                </div>
                                <div className="flex-row flex-center" style={{ width: '100%' }}>
                                <div className="flex-col flex-center" style={{ width: '50%' }}>
                                    <div style={{ fontSize }}>
                                        Valor: {advance.value}
                                    </div>
                                    <div style={{ fontSize }}>
                                        Costo: {advance.cost}
                                    </div>
                                </div>
                                <div className="flex-col flex-center" style={{ width: '50%' }}>
                                    <div style={{ fontSize, marginTop: '10px' }}>
                                        {typeof advance.created_date === 'string' ? new Date(advance.created_date).toLocaleString('en-US', { timeZone: 'America/Bogota' }).split(",")[0] : ''}
                                    </div>
                                    <div style={{ fontSize }}>
                                        {typeof advance.created_date === 'string' ? new Date(advance.created_date).toLocaleString('en-US', { timeZone: 'America/Bogota' }).split(",")[1] : ''}
                                    </div>
                                </div>
                                </div>
                                <div style={{ cursor: 'pointer', fontSize: '0.7em', color: 'blue', textDecoration: 'underline', marginTop: '10px' }}
                                    onClick={() => {
                                        pdf.download(advance.uuid ?? '')
                                    }}
                                >
                                    COMPROBANTE
                                </div>
                            </div>
                            <div className="flex-row" style={{ backgroundColor: '#EEE', width: '350px', padding: '5px 0px', height: '120px', color: 'white', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                                <div style={{ width: '100%', marginTop: '5px' }}>
                                {renderState(advance)}
                                </div>
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