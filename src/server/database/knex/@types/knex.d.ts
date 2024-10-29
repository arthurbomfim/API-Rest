import { ICidade } from '../../models';
import { Pessoa } from '../../models';


declare module 'knex/types/tables' {
 interface Tables {
  cidade: ICidade
  pessoa: Pessoa
  //usuario: IUsuario
 }
}