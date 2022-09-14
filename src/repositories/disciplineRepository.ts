import prisma from "../config/database";

export async function getDisciplineById( id:number ) {
    const discipline = await prisma.discipline.findFirst({
        where: {
            id
        }
    });

    return discipline;
}