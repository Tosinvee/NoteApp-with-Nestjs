/* eslint-disable prettier/prettier */
import { User, Note } from '@prisma/client';

export type IUser = Omit<User, 'password'> & {
  notes: Note;
};