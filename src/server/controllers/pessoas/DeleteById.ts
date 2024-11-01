import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { pessoasProvider } from '../../database/providers/pessoas';



interface IParamProps {
 id?: number;
}

export const deleteByIdValidation = validation(getSchema => ({
 params: getSchema<IParamProps>(yup.object().shape({
  id: yup.number().integer().required().moreThan(0),
 }))
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
 if (!req.params.id) {
  return res.status(StatusCodes.BAD_REQUEST).json({
   errors: {
    default: 'O parâmetro "id" precisa ser informado.'
   }
  });
 }
 const id = Number(req.params.id);
 const result = await pessoasProvider.DeleteById(id);
 if (result instanceof Error) {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
   errors: {
    default: result.message
   }
  });
 }

 return res.status(StatusCodes.OK).send();
};