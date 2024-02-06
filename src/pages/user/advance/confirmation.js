import { Button } from "antd";
import { formatToUSD } from "../../../_utils/format_currency";

export default function Confirmation({ hook }){

    return(
        <div style={{ margin: '20px 0', padding: '10px 50px', border: '1px solid #000', borderRadius: '10px' }}>
            <div style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '5px' }}>Confirmación</div> 
            <table style={{ width: '100%' }}>
                <tr>
                    <td style={{ fontSize: '0.95em', width: '60%', borderBottom: '1px solid #ccc' }}>Valor anticipo</td>
                    <td style={{ fontSize: '0.95em', width: '40%', borderBottom: '1px solid #ccc' }}>{formatToUSD(hook?.amount?.value)}</td>
                </tr>
                <tr>
                    <td style={{ fontSize: '0.95em', width: '60%', borderBottom: '3px solid #ccc' }}>Costo</td>
                    <td style={{ fontSize: '0.95em', width: '40%', borderBottom: '3px solid #ccc' }}>{formatToUSD(hook?.amount?.cost)}</td>
                </tr>
                <tr>
                    <td style={{ fontSize: '0.95em', fontWeight: 'bold', width: '60%' }}>Neto a recibir</td>
                    <td style={{ fontSize: '0.95em', fontWeight: 'bold', width: '40%' }}>{formatToUSD(hook?.amount?.value - hook?.amount?.cost)}</td>
                </tr>
            </table>
            {
                hook.loading ?
                <div className="flex-col flex-center" style={{ width: '100%' }}>
                    <div className="vp-spinner"></div>
                </div>
                :
                <div className="flex-row" style={{ width: '100%', margin: '20px 0' }}>
                    <div className="flex-col flex-center" style={{ width: '50%' }}>
                        <Button
                            style={{ width: '90%' }}
                            onClick={() => {
                                hook.setAmount(null);
                            }}
                        >
                            Cancelar
                        </Button>
                    </div>
                    <div className="flex-col flex-center" style={{ width: '50%' }}>
                        <Button
                            style={{ width: '90%' }}
                            type="primary"
                            onClick={() => {
                                hook.generate();
                            }}
                        >
                            Confirmar
                        </Button>
                    </div>
                </div>
            }
            <div>
                <ul>
                    <li style={{ margin: '10px -35px' }}>
                        MONTO A DESCONTAR EN SIGUINETE QUINCENA ES EL VALOR DEL ANTICIPO ANTES DEL COSTO
                    </li>
                    <li style={{ margin: '10px -35px' }}>
                        DESEMBOLSO SE REALIZA EN LAS SIGUIENTES 24 HORAS
                    </li>
                    <li style={{ margin: '10px -35px' }}>
                        EL DINERO SOLO SE PUEDE TRANSFERIR A TU CUENTA DE NÓMINA
                    </li>
                </ul>
            </div>
        </div>
    );
}