import * as create from './Create';
import * as getAll from './GetAll';
import * as deleteById from './DeleteById';
import * as getById from './GetById';
import * as updateById from './UpdateById';


export const pessoasController = {
 ...create,
 ...getAll,
 ...deleteById,
 ...getById,
 ...updateById
};

