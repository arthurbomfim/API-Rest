import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { ICidade } from '../../models';



export const UpdateById = async (Id: number, cidade: Omit<ICidade, 'id'>): Promise<void | Error> => {
 try {
  const result = await Knex(ETableNames.cidade)
   .update(cidade)
   .where('id', '=', Id);
  if (result > 0) return;
  return new Error('Erro ao atualizar o registro');
 } catch (error) {

  return new Error('Erro ao atualizar o registro');
 }
};
