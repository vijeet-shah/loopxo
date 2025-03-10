// components/email-template.tsx
import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  serviceType: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email,
  phone,
  address,
  serviceType,
  message,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.5', maxWidth: '600px', margin: '0 auto' }}>
    <h1 style={{ color: '#b45309', textAlign: 'center', marginBottom: '20px' }}>New Application Request</h1>
    
    <div style={{ backgroundColor: '#fef3c7', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
      <h2 style={{ color: '#78350f', marginTop: '0' }}>Applicant Information</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ fontWeight: 'bold', padding: '8px 0' }}>Name:</td>
            <td>{firstName} {lastName}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold', padding: '8px 0' }}>Email:</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold', padding: '8px 0' }}>Phone:</td>
            <td>{phone}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold', padding: '8px 0' }}>Address:</td>
            <td>{address}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div style={{ backgroundColor: '#fff9db', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
      <h2 style={{ color: '#78350f', marginTop: '0' }}>Application Details</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ fontWeight: 'bold', padding: '8px 0' }}>Service Type:</td>
            <td>{serviceType}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold', padding: '8px 0', verticalAlign: 'top' }}>Message:</td>
            <td>{message}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div style={{ textAlign: 'center', color: '#78350f', backgroundColor: '#fef3c7', padding: '10px', borderRadius: '8px' }}>
      <p>This is an automated email sent from the Shree Laxmi Co-Op Credit Society website.</p>
      <p style={{ margin: '0' }}>Please contact the applicant as soon as possible.</p>
    </div>
  </div>
);