import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { Pessoa } from '../../models';



export const GetAll = async (page: number, limit: number, filter: string): Promise<Pessoa[] | Error> => {
 try {
  const result = await Knex(ETableNames.pessoa)
   .select('*')
   .where('nomeCompleto', 'like', `%${filter}%`)
   .offset((page - 1) * limit)
   .limit(limit);

  return result;
 } catch (error) {

  return new Error('Erro ao buscar os registros');
 }
};
