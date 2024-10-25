import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { Pessoa } from '../../models';



export const UpdateById = async (Id: number, pessoa: Omit<Pessoa, 'id'>): Promise<void | Error> => {
 try {
  const result = await Knex(ETableNames.pessoa)
   .update(pessoa)
   .where('id', '=', Id);
  if (result > 0) return;
  return new Error('Erro ao atualizar o registro');
 } catch (error) {

  return new Error('Erro ao atualizar o registro');
 }
};
