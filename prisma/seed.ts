import prisma from "../src/config/database";

async function main () {
    const terms = [
        {number: 1},
        {number: 2},
        {number: 3},
        {number: 4},
        {number: 5},
        {number: 6}
    ]

    await prisma.$transaction(
        terms.map((term) =>
          prisma.term.upsert({
            where: term,
            update: {},
            create: term,
          })
        )
    );
    
    const categories = [
        {name: 'Projeto'},
        {name: 'Prática'},
        {name: 'Recuperação'}
    ]
    
    await prisma.$transaction(
        categories.map((categorie) =>
          prisma.category.upsert({
            where: categorie,
            update: {},
            create: categorie,
          })
        )
    );

    const teachers = [
        {name: 'Bruna Hamori'},
        {name: 'Diego Pinho'}
    ]

    await prisma.$transaction(
        teachers.map((teacher) =>
          prisma.teacher.upsert({
            where: teacher,
            update: {},
            create: teacher,
          })
        )
    );

    const disciplines = [
        {name: 'HTML e CSS', termId: 1},
        {name: 'JavaScript', termId: 2},
        {name: 'React', termId: 3},
        {name: 'Planejamento', termId: 2},
    ]

    await prisma.$transaction(
        disciplines.map((discipline) =>
          prisma.discipline.upsert({
            where: {name: discipline.name},
            update: {},
            create: discipline,
          })
        )
    );

    const teachersDisciplines = [
        {teacherId: 2, disciplineId: 1},
        {teacherId: 1, disciplineId: 2},
        {teacherId: 1, disciplineId: 3},
        {teacherId: 2, disciplineId: 4},
    ]

    await prisma.$transaction(
        teachersDisciplines.map((teachersDiscipline) =>
            prisma.teachersDisciplines.upsert({
                where: {
                    teacher_discipline: {
                        teacherId: teachersDiscipline.teacherId,
                        disciplineId: teachersDiscipline.disciplineId
                    }
                },
                update: {},
                create: teachersDiscipline,
            })
        )
    );

}

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });