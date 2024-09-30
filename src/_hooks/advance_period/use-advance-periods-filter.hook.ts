import { useCallback, useEffect, useState } from "react"
import { findAllEnterpriseEvent, findEnterpriseByIdEvent } from "../../_events/enterprise/find.event";
import { findAllAdvancePeriodByEnterpriseEvent } from "../../_events/advance_period/find.event";
import { findAllAdvanceByPeriodEvent } from "../../_events/advance/find.event";
import { message } from "antd";
import { EnterpriseType } from "../../_events/enterprise/type";
import { getCompany, getRol } from "../../_utils/storage_handler";
import { AdvancePeriodType } from "../../_events/advance_period/type";
import { AdvanceType } from "../../_events/advance/type";

export const useAdvancePeriodsFilter = () => {

    const [ enterprises, setEnterprises ] = useState<EnterpriseType[]>([]);
    const [ selectedEnterprise, setSelectedEnterprise] = useState<EnterpriseType | null>(null);
    const [ periods, setPeriods ] = useState<AdvancePeriodType[]>([]);
    const [ selectedPeriod, setSelectedPeriod] = useState<AdvancePeriodType | null>(null);

    const [ advances, setAdvances ] = useState<AdvanceType[]>([]);
    const [ loading, setLoading ] = useState<boolean>(false);

    const loadEnterprisesData = useCallback(() => {
        if(getRol() === 'ROOT'){
            findAllEnterpriseEvent()
            .then(json => {
                setEnterprises(json.list);
            })
            .catch(err => {
                message.error(err.message);
            });
        } else {
            findEnterpriseByIdEvent(getCompany())
            .then(json => {
                setEnterprises([json.data]);
            })
            .catch(err => {
                message.error(err.message);
            });
        }
    }, []);

    const loadPeriodsData = useCallback((enterprise: EnterpriseType | null) => {
        if(enterprise?.id) {
            findAllAdvancePeriodByEnterpriseEvent(enterprise.id)
            .then(json => {
                setPeriods(json.list);
            })
            .catch(err => {
                message.error(err.message);
            });
        }
    }, []);

    useEffect(() => {
        loadEnterprisesData();
    }, [loadEnterprisesData]);

    useEffect(() => {
        loadPeriodsData(selectedEnterprise);
    }, [selectedEnterprise, loadPeriodsData]);

    useEffect(() => {
        if(enterprises.length > 0){
            setSelectedEnterprise(enterprises[0]);
        }
    }, [enterprises]);

    useEffect(() => {
        if(periods.length > 0){
            setSelectedPeriod(periods[0]);
        }
    }, [periods]);

    useEffect(() => {
        if(selectedPeriod?.uuid) {
            setLoading(true);
            findAllAdvanceByPeriodEvent(selectedPeriod?.uuid)
            .then(json => {
                setAdvances(json.list);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                message.error(err.message);
            });
        }
    }, [selectedPeriod]);

    return{
        enterprises, 
        selectedEnterprise,
        periods,
        selectedPeriod,
        advances,
        loading,
        loadPeriodsData,
        setSelectedEnterprise,
        setSelectedPeriod
    }
}