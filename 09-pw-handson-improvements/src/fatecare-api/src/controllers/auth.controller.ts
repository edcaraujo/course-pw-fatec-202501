import { RequestHandler, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../models/user.model';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

async function login(req: Request, res: Response) {      
    /*  #swagger.tags = ['Auth']
        #swagger.description = 'Authenticates a user and returns a JWT token.'
        #swagger.parameters['body'] = {
              in: 'body',
              description: 'User credentials for login.',
              required: true,
              schema: { $ref: "#/definitions/Login" }
        }
        #swagger.responses[200] = {
              description: 'Login successful, returns a JWT token.',
              schema: { $ref: "#/definitions/LoginResponse" }
        }
        #swagger.responses[400] = { description: 'Bad Request: Username and password are required.' }
        #swagger.responses[401] = { description: 'Unauthorized: Invalid credentials.' }
    */
   
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
      return;
    }

    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { username } });

      if (!user) {
        res.status(401).json({ message: 'Credenciais inválidas.' });
        return;
      }

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({ message: 'Credenciais inválidas.' });
        return;
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );

      res.json({message: 'Login bem-sucedido!', token: token,});

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  };

  export default {
    login
  }