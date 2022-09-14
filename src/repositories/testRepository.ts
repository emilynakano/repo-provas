import { Test } from '@prisma/client';

export type CreateTest = Omit<Test, "id">