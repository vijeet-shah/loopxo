import { Resend } from 'resend';

// Initialize Resend with API key
export const resend = new Resend(process.env.RESEND_API_KEY);

// Add environment variable to your .env.local file:
// RESEND_API_KEY=your_api_key_here