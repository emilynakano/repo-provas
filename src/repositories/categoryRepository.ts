import prisma from "../config/database";

export async function getCategoryById(id:number) {
    const category = await prisma.category.findFirst({
        where: {
            id
        }
    })
   
    return category;
}