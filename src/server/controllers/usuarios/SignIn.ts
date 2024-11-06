import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { IUsuario } from '../../database/models';
import { usuariosProvider } from '../../database/providers/usuarios';
import { PasswordCrypto } from '../../shared/services';


interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> { }

export const getByEmailValidation = validation(getSchema => ({
 body: getSchema<IBodyProps>(yup.object().shape({
  email: yup.string().required().email().min(5),
  senha: yup.string().required().min(6)
 }))
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
 const { email, senha } = req.body;

 const result = await usuariosProvider.GetByEmail(email);
 if (result instanceof Error) {
  return res.status(StatusCodes.UNAUTHORIZED).json({
   errors: {
    default: 'Email ou senhas são invalidos!'
   }
  });
 }

 const login = await PasswordCrypto.verifyPassword(senha, result.senha);

 if (!login) {
  return res.status(StatusCodes.UNAUTHORIZED).json({
   errors: {
    default: 'Email ou senhas são invalidos!'
   }
  });
 } else {
  return res.status(StatusCodes.ACCEPTED).json({ token: 'token de acesso' });
 }


 // return res.status(StatusCodes.OK).json(result);
};