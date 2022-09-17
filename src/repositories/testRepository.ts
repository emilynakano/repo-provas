import prisma from '../config/database';

import { Test } from '@prisma/client';

export type CreateTest = Omit<Test, "id">

export async function insertTest( dataTest:CreateTest ) {
    await prisma.test.create({
        data: dataTest
    })
}

export async function getTestsFromDiscipline() {
  const tests = await prisma.term.findMany({
    select: {
        number: true,
        discipline: {
          select: {
            id: true,
            name: true,
            teachersDscipline: true
          },
        },
      },
  });


const categories = await prisma.category.findMany({
  select: {
    id: true,
    name: true,
    tests: {
      include: {
        teachersDiscipline: true
      }
    }
  }
})

const testsWithCategory = tests.map((test) => {
  return {
    number: test.number,
    discipline: test.discipline.map((discipline) => {
      return {
        id: discipline.id,
        name: discipline.name,
        categories: categories.map((categorie) => {
          return {
            id: categorie.id,
            name: categorie.name,
            test: categorie.tests.map((test) => {
              if(test.teachersDiscipline.disciplineId === discipline.id)
                return {
                  id: test.id,
                  name: test.name,
                  pdfUrl: test.pdfUrl
                }
            }).filter((testExists) => testExists)
          }
        }).filter((categoriesExists) => categoriesExists.test.length > 0)
      }
    })
  }
})

  return testsWithCategory;

}