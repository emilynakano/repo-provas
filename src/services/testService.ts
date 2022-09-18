import * as testRepository from '../repositories/testRepository';

import * as categoryService from '../services/categoryService';
import * as teacherService from '../services/teacherService';
import * as disciplineService from '../services/disciplineService';
import * as teacherDisciplineService from '../services/teacherDisciplineService'

import * as errorUtils from '../utils/errorUtils';
import * as emailUtils from '../utils/sendEmailUtils';

interface ITest {
    name: string;
    pdfUrl: string;
    categoryId: number;
    teacherId: number;
    disciplineId: number;
}

export async function createTest( dataTest: ITest ) {
    const {
        name,
        pdfUrl,
        categoryId,
        teacherId,
        disciplineId
    } = dataTest;

    const category = await categoryService.getCategoryById(categoryId);
    if(!category) throw errorUtils.notFoundError('category');

    const teacher = await teacherService.getTeacherById(teacherId);
    if(!teacher) throw errorUtils.notFoundError('teacher');

    const discipline = await disciplineService.getDisciplineById(disciplineId);
    if(!discipline) throw errorUtils.notFoundError('discipline');

    const relationTeacherDiscipline = await teacherDisciplineService.getTeacherDiscipline( teacherId, disciplineId );
    if(!relationTeacherDiscipline) throw errorUtils.notFoundError('relation between teacher and discipline');

    const insertedTest = await testRepository.insertTest({
        name,
        pdfUrl,
        categoryId, 
        teacherDisciplineId: relationTeacherDiscipline.id
    });

    await emailUtils.sendEmail(insertedTest.id)
}

export async function getTestsFromDiscipline() {
    const tests = await testRepository.getTestsFromDiscipline();

    return tests;
}

export async function getTestsFromTeacher() {
    const tests = await testRepository.getTestsFromTeacher();
    
    return tests;
}

export async function getTestFromId(id: number) {
    const tests = await testRepository.getTestFromId(id);
    
    return tests;
}