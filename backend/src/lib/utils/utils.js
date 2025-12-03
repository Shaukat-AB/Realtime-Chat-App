import jwt from 'jsonwebtoken';

export const cookieName = '_auth';

export const genToken = (userId, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const NODE_ENV = process.env.NODE_ENV;

  const expiresIn = '7d';
  const maxAge = 7 * 24 * 60 * 60 * 100; //mili seconds

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn,
  });

  res.cookie(cookieName, token, {
    maxAge,
    httpOnly: true, //prevents XSS attacks
    sameSite: 'strict', //prevents CSRF attacks
    secure: NODE_ENV !== 'dev',
  });

  return token;
};

export const newError = (message = 'Internal Server Error', status = 500) => {
  const err = new Error(message);
  err.status = status;
  return err;
};
