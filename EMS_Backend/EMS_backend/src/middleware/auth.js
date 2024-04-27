import { verify } from '../helpers/jwt';

export const isAuth = (req, res, next) => {
  try{
    const token = req.header('Authorization').replace('Bearer ', '');
    const user = verify(token);
    if(!user){
      return res.status(401).send({ message: 'Invalid Token' });
    }
    req.user = user;
    return next();
  }catch(err){
    return res.status(401).send({ message: 'AUTHENTICATION_ERROR' });
  }};

  export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role == 'admin') {
      return next();
    }else{
      return res.status(403).send({ message: 'Admin Token is not valid.' });
    }

  };