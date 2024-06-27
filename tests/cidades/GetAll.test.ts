import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';



describe('Cidades - GetAll', () => {


 it('Busca todos os registro', async () => {
  const res1 = await testServer
   .post('/cidades')
   .send({ nome: 'Aracaju' });


  expect(res1.statusCode).toEqual(StatusCodes.CREATED);

  const res1Busca = await testServer
   .get('/cidades')
   .send();

  expect(Number(res1Busca.header['x-total-count'])).toBeGreaterThan(0);
  expect(res1Busca.statusCode).toEqual(StatusCodes.OK);
  expect(res1Busca.body.length).toBeGreaterThan(0);
 });
 it('Passar um valor menor que 1 para page', async () => {

  const res1 = await testServer
   .get('/cidades?page=0&limit=1&filter=teste');


  expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  expect(res1.body).toHaveProperty('errors.query.page');
 });
 it('Passar um valor menor que 1 para limit', async () => {

  const res1 = await testServer
   .get('/cidades?page=1&limit=0&filter=teste');


  expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  expect(res1.body).toHaveProperty('errors.query.limit');
 });
 it('Passar um valor menor que 1 para page e limit', async () => {

  const res1 = await testServer
   .get('/cidades?page=0&limit=0&filter=teste');


  expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  expect(res1.body).toHaveProperty('errors.query.page');
  expect(res1.body).toHaveProperty('errors.query.limit');
 });
});