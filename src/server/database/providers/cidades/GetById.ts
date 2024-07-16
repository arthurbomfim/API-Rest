import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { ICidade } from '../../models';



export const GetById = async (Id: number): Promise<ICidade | Error> => {
 try {
  const result = await Knex.select('*').from(ETableNames.cidade).where('id', '=', Id).first();
  if (result) return result;
  return new Error('Registro não encontrado');
 } catch (error) {
  return new Error('Erro ao buscar o registro');
 }
};
