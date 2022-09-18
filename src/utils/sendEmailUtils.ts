import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const msg = {
  to: 'emafermetalurgica@gmail.com', 
  from: process.env.SENDGRID_EMAIL as string,
  subject: 'Nova prova adicionada',
  text: 'A seguinte prova foi adicionadas: Fulano P1 2022 - globo.com (CSS)',
  html: '<strong>A seguinte prova foi adicionadas: Fulano P1 2022 - globo.com (CSS)</strong>',
}

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })