import {
    createEnterprise,
    editEnterprise,
    resetLimitDateEnterprise
} from '../../_services/enterprise.service';
import { validateEnterprise } from './model';

export const createEnterpriseEvent = async (body: any) => {
    validateEnterprise(body);
    return await createEnterprise(body);
}

export const editEnterpriseEvent = async (id: any, body: any) => {
    validateEnterprise(body);
    return await editEnterprise(id, body);
}

export const resetLimitDateEnterpriseEvent = async (id: number) => {
    if(!id) throw new Error('Id enterprise not found');
    return await resetLimitDateEnterprise({id, date_limit: new Date().toISOString()});
}


/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */