import { ICidade, Pessoa, IUsuario } from '../../models';



declare module 'knex/types/tables' {
 interface Tables {
  cidade: ICidade
  pessoa: Pessoa
  usuario: IUsuario
 }
}