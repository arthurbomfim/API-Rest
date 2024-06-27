import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';



describe('Cidades - Delete', () => {


 it('Deleta registro', async () => {
  const res1 = await testServer
   .post('/cidades')
   .send({ nome: 'Aracaju' });


  expect(res1.statusCode).toEqual(StatusCodes.CREATED);

  const res1Apagada = await testServer
   .delete(`/cidades/${res1.body}`)
   .send();


  expect(res1Apagada.statusCode).toEqual(StatusCodes.OK);
 });
 it('Passar uma string no params', async () => {

  const res1 = await testServer
   .delete('/cidades/ads');


  expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  expect(res1.body).toHaveProperty('errors.params.id');
 });
 it('Passar um numero menor que 1', async () => {

  const res1 = await testServer
   .delete('/cidades/0');


  expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
  expect(res1.body).toHaveProperty('errors.params.id');
 });
 it('tentar apagar um registro que não existe', async () => {

  const res1 = await testServer
   .delete('/cidades/99999');


  expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
  expect(res1.body).toHaveProperty('errors.default');
 });
});