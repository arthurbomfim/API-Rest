import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';


export const count = async (filter = '') => {
	try {
		const [{ count }] = await Knex(ETableNames.cidade)
			.where('nome', 'like', `%${filter}%`)
			.count<[{ count: number }]>('as * count');
		if (Number.isInteger(Number(count))) return Number(count);

		return new Error('Erro ao consultar quantidade total de registros');
	} catch (error) {
		return new Error('Erro ao consultar quantidade total de registros');
	}
};