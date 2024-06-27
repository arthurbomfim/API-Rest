import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';



describe('Cidades - GetById', () => {


 it('Busca registro', async () => {
  const res1 = await testServer
   .post('/cidades')
   .send({ nome: 'Aracaju' });


  expect(res1.statusCode).toEqual(StatusCodes.CREATED);

  const res1Busca = await testServer
   .get('/cidades/1');


  expect(res1Busca.statusCode).toEqual(StatusCodes.OK);
  expect(res1Busca.body).toHaveProperty('nome');
 });
 it('Passar uma string no params', async () => {

  const res1 = await testServer
   .get('/cidades/ads');


  expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  expect(res1.body).toHaveProperty('errors.params.id');
 });
 it('Passar um numero menor que 1', async () => {

  const res1 = await testServer
   .get('/cidades/0');


  expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  expect(res1.body).toHaveProperty('errors.params.id');
 });
 it('tentar buscar um registro que não existe', async () => {

  const res1 = await testServer
   .get('/cidades/99999');


  expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  expect(res1.body).toHaveProperty('errors.default');
 });
});