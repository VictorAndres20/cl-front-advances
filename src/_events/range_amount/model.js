export const validateRangeAmount = (body) => {
    //const {  } = body;
}

export const transformEntityRangeAmount = (entity) => {
    let newEnt = {...entity}
    newEnt.amount = newEnt.amount?.uuid;
    newEnt.range = newEnt.range?.uuid;
    return newEnt;
}

export const buildEmptyRangeAmount = () => {
    return {
        uuid: '',
        amount: '',
        range: '',
    };
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */