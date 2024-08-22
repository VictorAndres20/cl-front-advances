import { Messages } from "./type";

export const validateMessages = (body: Messages) => {
    const { cod, message } = body;
    if(cod === '' || cod === undefined) throw new Error(`Código vacío`);
    if(message === '' || message === undefined) throw new Error(`Mensaje vacío`);
}

export const transformEntityMessages = (entity: Messages) => {
    let newEnt = {...entity}
    return newEnt;
}

export const buildEmptyMessages = (): Messages => {
    return {
        cod: '',
        message: '',
    };
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */