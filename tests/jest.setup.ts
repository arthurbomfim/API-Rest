import supertest from 'supertest';
import { Knex } from '../src/server/database/knex';
import { beforeAll, afterAll } from '@jest/globals';
import { server } from '../src/server/server';


beforeAll(async () => {
 await Knex.migrate.latest();
});

afterAll(async () => {
 await Knex.destroy();
});


export const testServer = supertest(server);