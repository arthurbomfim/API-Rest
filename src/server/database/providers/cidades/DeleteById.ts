import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';




export const DeleteById = async (Id: number): Promise<void | Error> => {
 try {
  const result = await Knex(ETableNames.cidade).where('id', '=', Id).del();
  if (result > 0) return;
  return new Error('Erro ao apagar o registro');
 } catch (error) {

  return new Error('Erro ao apagar o registro');
 }
};