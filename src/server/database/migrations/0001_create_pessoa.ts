import { Knex } from 'knex';
import { ETableNames } from '../ETablenames';


export async function up(knex: Knex) {
	return knex
		.schema
		.createTable(ETableNames.pessoa, table => {
			table.bigIncrements('id').primary().index();
			table.string('nomeCompleto').notNullable().index();
			table.string('email').notNullable().unique();

			table
				.bigInteger('cidadeId')
				.notNullable()
				.index()
				.references('id')
				.inTable(ETableNames.cidade)
				.onUpdate('CASCADE')
				.onDelete('RESTRICT');

			table.comment('Tabela usada para armazenar pessoas do sistema.');
		})
		.then(() => {
			console.log(`# Created Table ${ETableNames.pessoa}`);
		});
}


export async function down(knex: Knex) {
	return knex
		.schema
		.dropTable(ETableNames.pessoa)
		.then(() => {
			console.log(`# Dropped Table ${ETableNames.pessoa}`);
		});
}