import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { Pessoa } from '../../models';



export const GetById = async (Id: number): Promise<Pessoa | Error> => {
 try {
  const result = await Knex.select('*').from(ETableNames.pessoa).where('id', '=', Id).first();
  if (result) return result;
  return new Error('Registro não encontrado');
 } catch (error) {
  return new Error('Erro ao buscar o registro');
 }
};
