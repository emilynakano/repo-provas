import prisma from "../config/database";

export async function getTeacherById( id:number ) {
    const teacher = await prisma.teacher.findFirst({
        where: {
            id
        }
    })

    return teacher;
}