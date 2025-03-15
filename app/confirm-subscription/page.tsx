// app/confirm-subscription/page.tsx
import { confirmSubscription } from '@/lib/resend';
import { Check, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function ConfirmSubscription({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  console.log('Confirm subscription page loaded with params:', searchParams);
  
  const email = searchParams.email as string;
  const confirmationCode = searchParams.confirmationCode as string;
  
  // Validate params
  if (!email || !confirmationCode) {
    console.log('Invalid parameters for confirmation');
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full inline-flex mb-6">
            <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Invalid Confirmation Link</h1>
          <p className="text-muted-foreground mb-8">
            The confirmation link appears to be invalid or incomplete. Please check your email
            and try again, or request a new subscription.
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Process confirmation
  console.log(`Processing confirmation for ${email}`);
  const { emailConfirmed, message } = await confirmSubscription(email, confirmationCode);
  console.log('Confirmation result:', { emailConfirmed, message });
  
  if (emailConfirmed) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full inline-flex mb-6">
            <Check className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Subscription Confirmed!</h1>
          <p className="text-muted-foreground mb-8">
            {message || "Thank you for confirming your email! You're now subscribed to our newsletter."}
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full inline-flex mb-6">
            <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Confirmation Failed</h1>
          <p className="text-muted-foreground mb-8">
            {message || "We couldn't confirm your subscription. The link may have expired or is invalid."}
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }
}