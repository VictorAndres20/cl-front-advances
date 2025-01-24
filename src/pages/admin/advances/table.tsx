import { Button, Col, Row, Spin } from "antd";
import { useDownloadAdvancePdf } from "../../../_hooks/advance/useDownloadAdvancePdf.hook";
import { buildDateByUTCString, buildTZDate } from "../../../_utils/dateFormat";
import BasicBadge from "../../../widgets /badges/basic_badge";
import { useAdvancePeriodsFilter } from "../../../_hooks/advance_period/use-advance-periods-filter.hook";
import SearchSelect from "../../../widgets /selects/search_select";
import { formatToUSD } from "../../../_utils/format_currency";
import FinishPeriodModal from "./finish_period_modal";
import { getRol } from "../../../_utils/storage_handler";
import { roles } from "../../../_config/roles";

const columns = [
    '#',
    'PDF',
    'Empleado',
    'Activo',
    'Identificación',
    'Valor',
    'Costo',
    'Solicitado',
    'Aprobado',
    'Rechazado',
    'Empresa',
    'Depositar en',
    'Estado',
];

export default function Table(){

    const pdf = useDownloadAdvancePdf();
    const hook = useAdvancePeriodsFilter();

    //console.log(hook.enterprises);
    //console.log(hook.selectedEnterprise);
    //console.log(hook.periods);
    //console.log(hook.selectedPeriod);
    //console.log(hook.advances);

    return(
        <Row>
            <Col xs={4} md={4} lg={4}>
                <div
                    style={{ 
                        margin: '10px 15px',
                    }}
                >
                    <SearchSelect 
                        options={ hook.enterprises.map( e => ({ value: e.id, label: `${e.name}` }) ) }
                        placeholder="Empresa"
                        value={ hook.selectedEnterprise?.id ?? 0 }
                        onChange={(id) => {
                            const enterprise = hook.enterprises.find(e => e.id === id);
                            if(enterprise) hook.setSelectedEnterprise(enterprise);
                        }}
                    />
                </div>
            </Col>
            <Col xs={20} md={20} lg={20}>
                <div style={{ width: '500px', padding: '0 10px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.3em' }}>{hook.selectedPeriod?.name}</span>
                </div>
                {
                    hook.selectedPeriod && 
                    <div className="flex-row">
                        <div
                            style={{ width: '250px', padding: '20px 10px' }}
                        >
                            <div style={{ fontSize: '0.8em', height: '25px' }}>Inicio: {buildTZDate(hook.selectedPeriod.created_date)}</div>
                            <div style={{ fontWeight: 'bold' }}>Total anticipado: {formatToUSD(hook.advances.filter(advance => (typeof advance.state === 'object' && advance.state.cod === 'APPR') ? true : false).reduce((sum, advance) => sum + advance.value + advance.cost , 0))}</div>
                        </div>
                        <div style={{ width: '250px', padding: '20px 10px' }}
                        >
                            <div style={{ fontSize: '0.8em', height: '25px' }}>
                                {
                                    hook.selectedPeriod.finished_date ?
                                    'Finaliza: ' + buildTZDate(hook.selectedPeriod.finished_date) :
                                    
                                    getRol() === roles.root && 
                                    <FinishPeriodModal 
                                        enterprise={hook.selectedEnterprise?.id} 
                                        period={hook.selectedPeriod?.uuid}
                                        reload={() => {
                                            hook.loadPeriodsData(hook.selectedEnterprise);
                                        }}
                                    />
                                }
                            </div>
                            <div style={{ fontWeight: 'bold' }}>Cantidad anticipos: {hook.advances.length}</div>
                        </div>
                        <div style={{ width: '200px', padding: '20px 10px' }}
                        >
                            
                        </div>
                    </div>
                }
            </Col>
            <Col xs={4} md={4} lg={4}>
                {
                    hook.periods.map((period, index) => (
                        <div 
                            key={index}
                            style={{ 
                                margin: '10px 15px', 
                                border: '1px solid #000', 
                                borderRadius: '15px', 
                                cursor: 'pointer',
                                color: hook.selectedPeriod?.uuid === period.uuid ? '#ddd' : '#000',
                                backgroundColor: hook.selectedPeriod?.uuid === period.uuid ? '#001529' : '#eee' 
                            }}
                            onClick={() => {
                                hook.setSelectedPeriod(period);
                            }}
                        >
                            <div className="flex-col flex-center" style={{ padding: '10px 5px' }}>
                                <div>{period.name}</div>
                                <div style={{ fontSize: '0.8em' }}>{buildTZDate(period.created_date)}</div>
                                <div style={{ fontSize: '0.8em' }}>{period.finished_date ? buildTZDate(period.finished_date) : 'ACTIVO'}</div>
                            </div>
                        </div>
                    ))
                }
            </Col>
            <Col xs={20} md={20} lg={20}>
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <table className="employees-bulk-table">
                        <thead>
                            <tr>
                            {columns.map((col, index) => (<th key={index}>{col}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                            hook.loading ? 
                            <tr>
                                <td colSpan={12}>
                                    <div className="flex-col flex-center"><Spin /></div>
                                </td>
                            </tr> 
                            :
                            hook.advances.length === 0 ? 
                            <tr>
                                <td colSpan={12}>
                                    Sin datos
                                </td>
                            </tr> 
                            :
                            hook.advances.map((param, index) => (
                                <tr key={index}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <Button
                                            size="small"
                                            onClick={() => pdf.download(param.uuid ?? '')}
                                        >
                                            PDF
                                        </Button>
                                    </td>
                                    <td>
                                        <span className="advance-span">{typeof param.employee === 'object' ? param.employee?.name : 'NA'}</span>
                                    </td>
                                    <td>
                                        <div className="flex-col">
                                            {
                                                typeof param.employee === 'object' && param.employee?.retired_date ?
                                                <span className="advance-span">
                                                    Empleado retirado el <strong>{ typeof param.employee === 'object' ? buildTZDate(param.employee?.retired_date) : '' }</strong> por { typeof param.employee === 'object' ? typeof param.employee?.retired_by === 'object' ? `${param.employee?.retired_by?.name} ${param.employee?.retired_by?.email}` : '' : '' }
                                                </span>
                                                :
                                                <span className="advance-span">SÍ</span>
                                            }
                                        </div>
                                    </td>
                                    <td>
                                        <span className="advance-span">{typeof param.employee === 'object' ? param.employee?.id : 'NA'}</span>
                                    </td>
                                    <td>
                                        <span className="advance-span">{param.value}</span>
                                    </td>
                                    <td>
                                        <span className="advance-span">{param.cost}</span>
                                    </td>
                                    <td>
                                        <span className="advance-span">{buildTZDate(param.created_date)}</span>
                                    </td>
                                    <td>
                                        <span className="advance-span">{param.approved_date ? buildTZDate(param.approved_date) : ''}</span>
                                    </td>
                                    <td>
                                        <span className="advance-span">{param.declined_date ? buildTZDate(param.declined_date) : ''}</span>
                                    </td>
                                    <td>
                                        <span className="advance-span">{
                                        typeof param.employee === 'object' ? 
                                        typeof param.employee?.range === 'object' ? 
                                        typeof param.employee?.range?.enterprise === 'object' ? param.employee?.range?.enterprise.name
                                        : '' : '' : ''}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="advance-span">
                                        {
                                            !param.use_fintech ?
                                            typeof param.employee === 'object' ? 
                                            typeof param.employee?.bank === 'object' ? 
                                            `${
                                                param.employee?.bank?.name ?? ''
                                            }, ${
                                                typeof param.employee?.bank_account_type === 'object' ? 
                                                    param.employee?.bank_account_type?.name ?? ''
                                                : ''
                                            } ${
                                                param.employee?.bank_account_number ?? ''
                                            }`
                                            : '' : ''
                                            :
                                            typeof param.employee === 'object' ? 
                                            typeof param.employee?.fintech === 'object' ? 
                                            `${
                                                param.employee?.fintech?.name ?? ''
                                            } ${
                                                param.employee?.fintech_account_number ?? ''
                                            }`
                                            : '' : ''
                                        }
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            {(typeof param.state === 'object' && param.state.cod === 'PEND') ? <BasicBadge text="PENDIENTE" color="warning" /> : (typeof param.state === 'object' && param.state.cod === 'APPR') ? <BasicBadge text="Aprobado" color="success" /> : <BasicBadge text="No aprobado" color="danger" />}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Col>
        </Row>
    );
}