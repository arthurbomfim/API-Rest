import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';

interface ICidade {
 nome: string,
 estado: string
}


export const createValidation = validation((getSchema) => ({
 body: getSchema<ICidade>(yup.object().shape({
  nome: yup.string().required().min(3),
  estado: yup.string().required().min(3)
 }))
}));


export const create: RequestHandler = async (req: Request<{}, {}, ICidade>, res: Response) => {

 console.log(req.body);


 return res.send('Create!');
};