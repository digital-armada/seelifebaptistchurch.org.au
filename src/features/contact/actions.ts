'use server';

import { z } from 'zod';
import { contactFormSchema } from './model/contact.schema';
import * as brevo from '@getbrevo/brevo';

async function sendEmail(payload: {
    to: string;
    from: string;
    subject: string;
    html: string;
    reply_to: string;
}) {
    if (!process.env.BREVO_API_KEY) {
        throw new Error('BREVO_API_KEY is not configured');
    }

    // Initialize Brevo API
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
        brevo.TransactionalEmailsApiApiKeys.apiKey,
        process.env.BREVO_API_KEY
    );

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.to = [{ email: payload.to }];
    sendSmtpEmail.sender = {
        email: payload.from,
        name: 'See Life Baptist Church Website',
    };
    sendSmtpEmail.replyTo = { email: payload.reply_to };
    sendSmtpEmail.subject = payload.subject;
    sendSmtpEmail.htmlContent = payload.html;
    sendSmtpEmail.textContent = payload.html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ');

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return { success: true };
}

export async function sendContactMessageAction(
    input: z.infer<typeof contactFormSchema>
) {
    const validation = contactFormSchema.safeParse(input);

    if (!validation.success) {
        return {
            success: false,
            error: 'Invalid input. Please check the form.',
        };
    }

    const { name, email, phone, message } = validation.data;

    const emailHtml = `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    try {
        await sendEmail({
            to:
                process.env.CONTACT_FORM_RECIPIENT ||
                'info@seelifebaptistchurch.org.au',
            from: 'noreply@seelifebaptistchurch.org.au',
            reply_to: email,
            subject: `New Message from ${name} via Contact Form`,
            html: emailHtml,
        });

        return { success: true };
    } catch (error) {
        console.error('Failed to send contact email:', error);
        return {
            success: false,
            error: 'Sorry, we could not send your message at this time.',
        };
    }
}
