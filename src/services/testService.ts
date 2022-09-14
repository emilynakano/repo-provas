import * as testRepository from '../repositories/testRepository';
import * as categoryService from '../services/categoryService';

import * as errorUtils from '../utils/errorUtils'

export async function createTest( dataTest: testRepository.CreateTest ) {
    const {
        categoryId
    } = dataTest;

    const category = await categoryService.getCategoryById(categoryId)
    if(!category) throw errorUtils.notFoundError('category')
}