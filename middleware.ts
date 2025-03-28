<<<<<<< HEAD
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
=======
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
>>>>>>> 6e92d63 (Middleware 1mb)

export const { auth: middleware } = NextAuth(authConfig);
