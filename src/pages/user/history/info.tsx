import { Col } from "antd";
import { useFindAllAdvancesPagedByEmployee } from "../../../_hooks/advance/useFindAllAdvancesPagedByEmployee.hook";
import { AdvanceType } from "../../../_events/advance/type";

const fontSize = '0.8em';

export default function InfoAdvances(){

    const dataHook = useFindAllAdvancesPagedByEmployee();

    const renderState = (advance: AdvanceType) => {
        if(typeof advance.state === 'object'){
            const state = advance.state?.cod
            if(state === 'PEND'){
                return(
                    <div className="flex-col flex-center" style={{ width: '40%' }}>
                        <div style={{ fontSize, fontWeight: 'bold' }}>
                            Transferencia
                        </div>
                        <div style={{ fontSize }}>
                            Estado: {typeof advance.state === 'object' ? advance.state?.cod : 'NA'}
                        </div>
                    </div>
                );
            } else if(state === 'APPR'){
                return(
                    <div className="flex-col flex-center" style={{ width: '40%' }}>
                        <div style={{ fontSize, fontWeight: 'bold' }}>
                            Transferencia
                        </div>
                        <div style={{ fontSize }}>
                            Estado: {state}
                        </div>
                        <div style={{ fontSize, marginTop: '10px' }}>
                            {typeof advance.approved_date === 'string' ? advance.approved_date.split("T")[0] : ''}
                        </div>
                        <div style={{ fontSize }}>
                            {typeof advance.approved_date === 'string' ? advance.approved_date.split("T")[1].split(".")[0] : ''}
                        </div>
                    </div>
                );
            } else if(state === 'DECL'){
                return(
                    <div className="flex-col flex-center" style={{ width: '40%' }}>
                        <div style={{ fontSize, fontWeight: 'bold' }}>
                            Transferencia
                        </div>
                        <div style={{ fontSize }}>
                            Estado: {state}
                        </div>
                        <div style={{ fontSize, marginTop: '10px' }}>
                            {typeof advance.declined_date === 'string' ? advance.declined_date.split("T")[0] : ''}
                        </div>
                        <div style={{ fontSize }}>
                            {typeof advance.declined_date === 'string' ? advance.declined_date.split("T")[1].split(".")[0] : ''}
                        </div>
                    </div>
                );
            }
            
        }
        return(<></>);
    }

    return(
        <Col lg={24} xs={24}>
            {
                dataHook.data.list.length === 0 ?
                    <div>Sin adelantos solicitados</div>
                :
                dataHook.data.list.map((advance, key) => {
                    return(
                        <div className="flex-row flex-center" style={{ width: '96%', border: '1px solid #000', margin: '10px 0', padding: '5px 0' }} key={`advance_history_${key}`}>
                            <div className="flex-col flex-center" style={{ width: '40%', border: '1px solid #000', marginRight: '2px', padding: '5px 0px' }}>
                                <div style={{ fontSize, fontWeight: 'bold', marginBottom: '10px' }}>
                                    Anticipo Solicitado
                                </div>
                                <div style={{ fontSize }}>
                                    Valor: {advance.value}
                                </div>
                                <div style={{ fontSize }}>
                                    Costo: {advance.cost}
                                </div>
                                <div style={{ fontSize, fontWeight: 'bold' }}>
                                    Neto: {advance.value - advance.cost}
                                </div>
                                <div style={{ fontSize, marginTop: '10px' }}>
                                    {typeof advance.created_date === 'string' ? advance.created_date.split("T")[0] : ''}
                                </div>
                                <div style={{ fontSize }}>
                                    {typeof advance.created_date === 'string' ? advance.created_date.split("T")[1].split(".")[0] : ''}
                                </div>
                            </div>
                            {renderState(advance)}
                        </div>
                    );
                })
            }
        </Col>
    );
}