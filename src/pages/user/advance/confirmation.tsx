import { Button, Popconfirm } from "antd";
import { formatToUSD } from "../../../_utils/format_currency";
import { GenerateAdvacneHook } from "../../../_hooks/advance/useGenerateAdvance.hook";

export default function Confirmation({ hook }: { hook: GenerateAdvacneHook }){

    return(
        <div style={{ margin: '20px 0', padding: '10px 50px', border: '1px solid #000', borderRadius: '10px' }}>
            <div style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '5px' }}>Confirmación</div> 
            <table style={{ width: '100%' }}>
                <tbody>
                <tr>
                    <td style={{ fontSize: '0.95em', width: '60%', borderBottom: '1px solid #ccc' }}>Valor anticipo</td>
                    <td style={{ fontSize: '0.95em', width: '40%', borderBottom: '1px solid #ccc' }}>{formatToUSD(hook.advance?.value ?? 0)}</td>
                </tr>
                <tr>
                    <td style={{ fontSize: '0.95em', width: '60%', borderBottom: '3px solid #ccc' }}>Costo</td>
                    <td style={{ fontSize: '0.95em', width: '40%', borderBottom: '3px solid #ccc' }}>{formatToUSD(hook.advance?.cost ?? 0 )}</td>
                </tr>
                <tr>
                    <td style={{ fontSize: '0.95em', width: '60%' }}></td>
                    <td style={{ fontSize: '0.95em', width: '40%' }}>{formatToUSD((hook.advance?.cost ?? 0) + (hook.advance?.value ?? 0) )}</td>
                </tr>
                </tbody>
            </table>
            <div>
            <div style={{ margin: '10px -35px', fontWeight: 'bold' }}>
                AL PRESIONAR CONFIRMAR ESTÁS AUTORIZANDO EXPRESA E IRREVOCABLEMENTE EL DESCUENTO EN EL SALARIO DE LA QUINCENA CORRIENTE POR UN VALOR DE  
                <span style={{ fontSize: '1.4em', marginLeft: '7px', borderBottom: '1px solid #000' }}>{formatToUSD((hook?.advance?.value ?? 0) + (hook?.advance?.cost ?? 0))}</span>
            </div>
            <div style={{ margin: '10px -35px', fontWeight: 'bold' }}>En caso de retiro, la Empresa también se entenderá expresa e irrevocablemente autorizada para descontar dicha suma de los salarios, prestaciones sociales, vacaciones, indemnizaciones, beneficios o auxilios legales o extralegales y cualquier otra acreencia laboral que tuvieras a tu favor.</div>
            <div>
            Favor tener en cuenta que el dinero solo se puede desembolsar en tu cuenta de nómina. La transferencia se realizará en las próximas 24 horas.
            </div>
            </div>
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
                                hook.updateAmountToAdvance(null);
                            }}
                        >
                            Cancelar
                        </Button>
                    </div>
                    <div className="flex-col flex-center" style={{ width: '50%' }}>
                        <Popconfirm
                            title="Crear solicitud"
                            description="¿Estás seguro de crear la solicitud?"
                            onConfirm={() => {
                                hook.generate();
                            }}
                            onCancel={() => {}}
                            okText="Sí"
                            cancelText="No"
                        >
                        <Button
                            style={{ width: '90%' }}
                            type="primary"
                        >
                            Confirmar
                        </Button>
                        </Popconfirm>
                    </div>
                </div>
            }
        </div>
    );
}