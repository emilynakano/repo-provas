import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import { getUsers } from '../repositories/authRepository';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendEmail(id: number) {
  console.log(id)
  const users = await getUsers();

  const msg = {
    from: process.env.SENDGRID_EMAIL as string,
    subject: 'Nova prova adicionada',
    text: 'A seguinte prova foi adicionadas: Fulano P1 2022 - globo.com (CSS)',
    html: '<strong>A seguinte prova foi adicionadas: Fulano P1 2022 - globo.com (CSS)</strong>',
  }

  users.forEach(user => {
    sgMail
    .send({...msg, to: user.email})
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
        
  });
}