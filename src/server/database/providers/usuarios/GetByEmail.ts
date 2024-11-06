import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IUsuario } from '../../models';



export const GetByEmail = async (email: string): Promise<IUsuario | Error> => {
 try {
  const result = await Knex.select('*').from(ETableNames.usuario).where('email', '=', email).first();
  if (result) return result;
  return new Error('Registro não encontrado');
 } catch (error) {
  return new Error('Erro ao buscar o registro');
 }
};
