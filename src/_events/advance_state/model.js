export const validateAdvanceState = (body) => {
    //const {  } = body;
}

export const transformEntityAdvanceState = (entity) => {
    let newEnt = {...entity}
    return newEnt;
}

export const buildEmptyAdvanceState = () => {
    return {
        cod: '',
        name: '',
    };
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */