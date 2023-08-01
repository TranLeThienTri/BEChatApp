/* eslint-disable prettier/prettier */
import session from 'express-session';

export const sessionConfig = {
  secret: 'tuitentri', // Thay thế 'your_secret_key' bằng một chuỗi bí mật thực tế
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 900000, // Thời gian sống của session (15 phút)
  },
};
