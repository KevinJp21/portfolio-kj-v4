'use server';

import { Resend } from 'resend';
import EmailTemplate from '../../../../emails/email-template';
import ConfirmationEmailTemplate from '../../../../emails/confirmation-email-template';
import { TContactFormValues } from '../types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function apiPostSendEmailAction(
  data: TContactFormValues
): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // Correo para mi
    const { error: adminError } = await resend.emails.send({
      from: 'Kevin Julio <contact@kevinjp.dev>',
      to: 'kevinjp821@gmail.com',
      replyTo: data.email,
      subject: `Nuevo contacto — ${data.name}`,
      react: <EmailTemplate {...data} />,
    });

    if (adminError) {
      console.error(adminError);

      return {
        success: false,
        message: 'No fue posible enviar el correo.',
      };
    }

    // Confirmación para el cliente
    const { error: confirmationError } = await resend.emails.send({
      from: 'Kevin Julio <contact@kevinjp.dev>',
      to: data.email,
      subject: 'He recibido tu mensaje',
      react: (
        <ConfirmationEmailTemplate
          name={data.name}
          inquiryType={data.inquiryType}
        />
      ),
    });

    if (confirmationError) {
      console.error(confirmationError);
      // No fallamos toda la acción si el correo de confirmación falla.
    }

    return {
      success: true,
      message: 'Correo enviado correctamente.',
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Ha ocurrido un error inesperado.',
    };
  }
}