import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import { getUsers } from '../repositories/authRepository';
import { getTestFromId } from '../repositories/testRepository';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendEmail(id: number) {
  const test = await getTestFromId(id);
  const users = await getUsers();

  const msg = {
    from: process.env.SENDGRID_EMAIL as string,
    subject: 'Confira a nova prova adicionada ao sistema!',
    text: `A seguinte prova foi adicionada: ${test?.teachersDiscipline.teacher.name} ${test?.category.name} ${test?.name} (${test?.teachersDiscipline.discipline.name})`,
    html: `<strong>A seguinte prova foi adicionada: ${test?.teachersDiscipline.teacher.name} ${test?.category.name} ${test?.name} (${test?.teachersDiscipline.discipline.name})</strong>`,
  }

  users.forEach(user => {
    sgMail
    .send({...msg, to: user.email})
    .then(() => {
    })
    .catch((error) => {
      console.error(error)
    })
        
  });
}