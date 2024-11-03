import { useAdvanceEmployeeLimitInfo } from "../../../_hooks/advance/use-advance-employee-limit-info.hook";
import { formatToUSD } from "../../../_utils/format_currency";
import { getUserId } from "../../../_utils/storage_handler";

export default function LimitInfo(){

    const infoHook = useAdvanceEmployeeLimitInfo(getUserId() ?? '');

    if(!infoHook.data) return <div></div>

    return(
        <div style={{ width: '100%', padding: '10px 0', borderRadius: '20px', marginTop: '10px' }}>
            <div className="flex-col flex-center" style={{ fontSize: '0.8em', fontWeight: 'bold', margin: '10px 0', width: '100%' }}>
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <span>
                                Límite del ciclo:
                            </span>
                        </td>
                        <td>
                            <div style={{ width: '30px' }}></div>
                        </td>
                        <td>
                            {formatToUSD(infoHook.data.limit)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>
                                Total anticipado en este ciclo:
                            </span>
                        </td>
                        <td>
                            <div style={{ width: '30px' }}></div>
                        </td>
                        <td>
                            {formatToUSD(infoHook.data.total)}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}