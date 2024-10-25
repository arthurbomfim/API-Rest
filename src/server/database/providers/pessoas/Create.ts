import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { Pessoa } from '../../models';



export const create = async (pessoa: Omit<Pessoa, 'id'>): Promise<number | Error> => {
 try {
  const [result] = await Knex(ETableNames.pessoa).insert(pessoa).returning('id');
  if (typeof result === 'object') {
   return result.id;
  } else if (typeof result === 'number') {
   return result;
  }
  return new Error('Erro ao cadastrar o registro');
 } catch (error) {

  return new Error('Erro ao cadastrar o registro');
 }


};

