import { NextRequest, NextResponse } from 'next/server';
import { BrevoClient } from '@getbrevo/brevo';

export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, message } = await request.json();

        if (!process.env.BREVO_API_KEY) {
            throw new Error('BREVO_API_KEY is not configured');
        }

        const client = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

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

        console.log('Sending email with Brevo...');
        const result = await client.transactionalEmails.sendTransacEmail({
            to: [{ email: 'info@seelifebaptistchurch.org.au' }],
            sender: { email: 'noreply@seelifebaptistchurch.org.au', name: 'See Life Baptist Church Website' },
            replyTo: { email, name },
            subject: `Contact Form: ${name}`,
            textContent,
            htmlContent,
        });
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
