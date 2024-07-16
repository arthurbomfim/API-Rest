import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { cidadesProvider } from '../../database/providers/cidades';

interface IQueryProps {
 page?: number,
 limit?: number,
 filter?: string
}


export const getAllValidation = validation((getSchema) => ({
 query: getSchema<IQueryProps>(yup.object().shape({
  page: yup.number().optional().moreThan(0),
  limit: yup.number().optional().moreThan(0),
  filter: yup.string().optional(),
 }))
}));


export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

 // res.setHeader('access-control-expose-headers', 'x-total-count');
 // res.setHeader('x-total-count', 1);
 const page = Number(req.query.page);
 const limit = Number(req.query.limit);
 const filter = String(req.query.filter);
 const result = await cidadesProvider.GetAll(page, limit, filter);
 if (result instanceof Error) {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
   errors: {
    default: result.message
   }
  });
 }


 return res.status(StatusCodes.OK).json(result);
};