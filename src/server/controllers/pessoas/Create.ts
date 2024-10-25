import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { Pessoa } from '../../database/models';
import { pessoasProvider } from '../../database/providers/pessoas';

interface IBodyProps extends Omit<Pessoa, 'id'> { }


export const createValidation = validation((getSchema) => ({
 body: getSchema<IBodyProps>(yup.object().shape({
  nomeCompleto: yup.string().required().min(3).max(150),
  email: yup.string().required().min(3).max(150),
  cidadeId: yup.number().required(),
 }))
}));


export const create: RequestHandler = async (req: Request<{}, {}, Pessoa>, res: Response) => {

 const result = await pessoasProvider.create(req.body);
 if (result instanceof Error) {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
   errors: {
    default: result.message
   }
  });
 }

 return res.status(StatusCodes.CREATED).json(result);
};