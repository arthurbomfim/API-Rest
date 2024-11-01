import { Knex } from 'knex';
import { ETableNames } from '../ETablenames';


export async function up(knex: Knex) {
	return knex
		.schema
		.createTable(ETableNames.usuario, table => {
			table.bigIncrements('id').primary().index();
			table.string('nome').notNullable().checkLength('>', 3);
			table.string('email').index().notNullable().unique().checkLength('>', 5);
			table.string('senha').notNullable().checkLength('>', 5);

			table.comment('Tabela usada para armazenar usuarios do sistema.');
		})
		.then(() => {
			console.log(`# Created Table ${ETableNames.usuario}`);
		});
}


export async function down(knex: Knex) {
	return knex
		.schema
		.dropTable(ETableNames.usuario)
		.then(() => {
			console.log(`# Dropped Table ${ETableNames.usuario}`);
		});
}