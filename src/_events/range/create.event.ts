import {
    createRange,
    editRange,
} from '../../_services/range.service';
import { validateRange } from './model';
import { RangeType } from './type';

export const createRangeEvent = async (body: RangeType) => {
    validateRange(body);
    return await createRange(body);
}

export const editRangeEvent = async (id: string, body: RangeType) => {
    validateRange(body);
    return await editRange(id, body);
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */