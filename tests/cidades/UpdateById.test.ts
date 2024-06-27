import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';



describe('Cidades - UpdateById', () => {


 it('Atualiza registro', async () => {
  const res1 = await testServer
   .post('/cidades')
   .send({ nome: 'Aracaju' });


  expect(res1.statusCode).toEqual(StatusCodes.CREATED);

  const res1Update = await testServer
   .put('/cidades/1')
   .send({ nome: 'Aracaju' });


  expect(res1Update.statusCode).toEqual(StatusCodes.OK);
 });
 it('passando nome com menos de 3 caracteres', async () => {

  const res1 = await testServer
   .put('/cidades/1')
   .send({ nome: 'Ar' });


  expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  expect(res1.body).toHaveProperty('errors.body.nome');
 });
 it('Passar uma string no params', async () => {

  const res1 = await testServer
   .put('/cidades/ads')
   .send({ nome: 'Aracaju' });


  expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  expect(res1.body).toHaveProperty('errors.params.id');
 });
 it('Passar um numero menor que 1', async () => {

  const res1 = await testServer
   .put('/cidades/0')
   .send({ nome: 'Aracaju' });


  expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  expect(res1.body).toHaveProperty('errors.params.id');
 });
 it('tentar atualizar um registro que não existe', async () => {

  const res1 = await testServer
   .put('/cidades/99999')
   .send({ nome: 'Aracaju' });


  expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  expect(res1.body).toHaveProperty('errors.default');
 });
});