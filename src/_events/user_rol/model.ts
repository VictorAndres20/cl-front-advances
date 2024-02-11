import { UserRolType } from "./type";

export const validateUserRol = (body: UserRolType) => {
    const { cod, name } = body;
    if(cod === '' || cod === undefined) throw new Error(`Código vacío`);
    if(name === '' || name === undefined) throw new Error(`Nombre vacío`);
}

export const transformEntityUserRol = (entity: UserRolType) => {
    let newEnt = {...entity}
    return newEnt;
}

export const buildEmptyUserRol = (): UserRolType => {
    return {
        cod: '',
        name: '',
    };
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */