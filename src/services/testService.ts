import * as testRepository from '../repositories/testRepository';
import * as categoryService from '../services/categoryService';

import * as errorUtils from '../utils/errorUtils'

interface ITest {
    name: string;
    pdfUrl: string;
    categoryId: number;
    teacherId: number;
    disciplineId: number;
}

export async function createTest( dataTest: ITest ) {
    const {
        categoryId
    } = dataTest;

    const category = await categoryService.getCategoryById(categoryId)
    if(!category) throw errorUtils.notFoundError('category')
}