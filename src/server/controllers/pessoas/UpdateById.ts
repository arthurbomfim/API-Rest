import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { Pessoa } from '../../database/models';
import { pessoasProvider } from '../../database/providers/pessoas';

interface IParamProps {
 id?: number,
}

interface IBodyProps extends Omit<Pessoa, 'id'> { }

export const updateByIdValidation = validation(getSchema => ({
 body: getSchema<IBodyProps>(yup.object().shape({
  nomeCompleto: yup.string().required().min(3).max(150),
  email: yup.string().required().min(3).max(150),
  cidadeId: yup.number().required(),
 })),
 params: getSchema<IParamProps>(yup.object().shape({
  id: yup.number().integer().required().moreThan(0),
 }))
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
 if (!req.params.id) {
  return res.status(StatusCodes.BAD_REQUEST).json({
   errors: {
    default: 'O parâmetro "id" precisa ser informado.'
   }
  });
 }

 const id = Number(req.params.id);
 const result = await pessoasProvider.UpdateById(id, req.body);
 if (result instanceof Error) {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
   errors: {
    default: result.message
   }
  });
 }


 return res.status(StatusCodes.OK).json(result);
};