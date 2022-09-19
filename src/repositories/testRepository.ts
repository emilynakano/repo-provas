import prisma from '../config/database';

import { Test } from '@prisma/client';

export type CreateTest = Omit<Test, "id">

export async function insertTest( dataTest:CreateTest ) {
  const testInserted = await prisma.test.create({
      data: dataTest
  });
  
  return testInserted;
}

export async function getTestsFromDiscipline() {
  const terms = await prisma.term.findMany({
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
          teachersDiscipline: {
            select: {
              disciplineId: true,
              teacher: {
                select: {
                  name: true,
                  id: true
                }
              }
            }
          }
        }
      }
    }
  });

  const testsWithCategory = terms.map((term) => {
    return {
      term: term.number,
      disciplines: term.discipline.map((discipline) => {
        return {
          id: discipline.id,
          name: discipline.name,
          categories: categories.map((categorie) => {
            return {
              id: categorie.id,
              name: categorie.name,
              tests: categorie.tests.map((test) => {
                if(test.teachersDiscipline.disciplineId === discipline.id)
                  return {
                    id: test.id,
                    name: test.name,
                    teacherName: test.teachersDiscipline.teacher.name,
                    teacherId: test.teachersDiscipline.teacher.id,
                    pdfUrl: test.pdfUrl
                  }
              }).filter((testExists) => testExists)
            }
          }).filter((categoriesExists) => categoriesExists.tests.length > 0)
        }
      })
    }
  });

  return testsWithCategory;

}

export async function getTestsFromTeacher() {
  const teachers = await prisma.teacher.findMany({
    select: {
      id: true,
      name: true,
    }
  });

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      tests: {
        select: {
          id: true,
          name: true,
          teachersDiscipline: {
            select: {
              teacherId: true,
              discipline: {
                select: {
                  name: true,
                  id: true
                }
              }
            }
          }
        }
      }
    }
  });

  const testsWithCategory = teachers.map((teacher) => {
    return {
      id: teacher.id,
      name: teacher.name,
      categories: categories.map((categorie) => {
        return {
          id: categorie.id,
          name: categorie.name,
          tests: categorie.tests.map((test) => {
            if(teacher.id === test.teachersDiscipline.teacherId)
            return {
              id: test.id,
              name: test.name,
              disciplineName: test.teachersDiscipline.discipline.name,
              disciplineId: test.teachersDiscipline.discipline.id,
            }
          }).filter((testExists) => testExists)
        }
      }).filter((categorieExists) => categorieExists.tests.length > 0)
    }
  })

  return testsWithCategory
};

export async function getTestFromId(id: number) {
  const test = await prisma.test.findUnique({
    where: {
      id
    },
    select: {
      name: true,
      category: {
        select: {
          name: true
        }
      },
      teachersDiscipline: {
        select: {
          teacher: {
            select: {
              name: true
            }
          },
          discipline: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })
  
  return test;
}
