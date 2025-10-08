import { NextRequest, NextResponse } from 'next/server';
import * as brevo from '@getbrevo/brevo';

export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, message } = await request.json();

        if (!process.env.BREVO_API_KEY) {
            throw new Error('BREVO_API_KEY is not configured');
        }

        // Initialize Brevo API
        const apiInstance = new brevo.TransactionalEmailsApi();
        apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

        // Prepare email content
        const textContent = `New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}`;

        const htmlContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        `;

        const sendSmtpEmail = new brevo.SendSmtpEmail();
        sendSmtpEmail.to = [{ email: 'info@seelifebaptistchurch.org.au' }];
        sendSmtpEmail.sender = { email: 'noreply@seelifebaptistchurch.org.au', name: 'See Life Baptist Church Website' };
        sendSmtpEmail.replyTo = { email: email, name: name };
        sendSmtpEmail.subject = `Contact Form: ${name}`;
        sendSmtpEmail.textContent = textContent;
        sendSmtpEmail.htmlContent = htmlContent;

        console.log('Sending email with Brevo...');
        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Brevo response:', result);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Brevo error details:', error);
        return NextResponse.json(
            { error: 'Failed to send message', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
