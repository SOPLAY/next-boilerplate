import { hash, compare } from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> =>
  await hash(password, 12);

export const verifyPassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => await compare(password, hashPassword);
