import { RangeType } from "./type";

export const validateRange = (body: RangeType) => {
    const { id, enterprise } = body;
    if(id === '' || id === undefined) throw new Error(`ID vacío`);
    if(enterprise === 0 || enterprise === undefined) throw new Error(`Empresa vacío`);
}

export const transformEntityRange = (entity: RangeType) => {
    let newEnt = {...entity};
    if(typeof newEnt.enterprise === 'object'){
        newEnt.enterprise = newEnt.enterprise?.id;
    }
    return newEnt;
}

export const buildEmptyRange = () => {
    return {
        uuid: '',
        id: '',
        enterprise: '',
    };
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */