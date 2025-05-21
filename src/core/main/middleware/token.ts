import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface jwtPayload {
    id: number;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: number;
    };
  }
}

export const autenticarToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ erro: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
      const decoded = jwt.verify(token, 'Banana') as jwtPayload;
      req.user = { id: decoded.id };
      return next();
  } catch (error) {
      console.error('Erro ao verificar o token:', error);
      return res.status(403).json({ erro: 'Token inválido' });
  }
}
