import { getCompany } from "../../_utils/storage_handler";
import { RangeType } from "./type";

export const validateRange = (body: RangeType) => {
    const { id, enterprise, money_limit } = body;
    if(id === '' || id === undefined) throw new Error(`ID vacío`);
    if(enterprise === 0 || enterprise === undefined) throw new Error(`Empresa vacío`);
    if(money_limit === 0 || money_limit === undefined) throw new Error(`Tope vacío`);
}

export const transformEntityRange = (entity: RangeType) => {
    let newEnt = {...entity};
    if(typeof newEnt.enterprise === 'object'){
        newEnt.enterprise = newEnt.enterprise?.id;
    }
    return newEnt;
}

export const buildEmptyRange = (): RangeType => {
    return {
        uuid: '',
        id: '',
        active: 1,
        money_limit: 0,
        enterprise: 0,
    };
}

export const buildRangeWithEnterprise = (enterprise: number): RangeType => {
    return {
        ...buildEmptyRange(),
        enterprise,
    };
}

export const buildRangeWithLoggedEnterprise = (): RangeType => {
    return buildRangeWithEnterprise(getCompany());
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */