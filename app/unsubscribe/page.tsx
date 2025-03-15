import { removeFromSubscribersList } from '@/lib/resend';
import { Check, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Define types for Next.js v15 async params
type SearchParamsType = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Unsubscribe({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  // Await the searchParams as they're now a Promise in Next.js v15
  const resolvedSearchParams = await searchParams;
  console.log('Unsubscribe page loaded with params:', resolvedSearchParams);
  
  const email = resolvedSearchParams.email as string;
  const confirmationCode = resolvedSearchParams.confirmationCode as string;
  
  // Validate params
  if (!email || !confirmationCode) {
    console.log('Invalid parameters for unsubscribe');
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full inline-flex mb-6">
            <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Invalid Unsubscribe Link</h1>
          <p className="text-muted-foreground mb-8">
            The unsubscribe link appears to be invalid or incomplete. Please try again
            using the link in your newsletter email.
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Process unsubscription
  console.log(`Processing unsubscribe for ${email}`);
  const { unsubscribed, message } = await removeFromSubscribersList(email, confirmationCode);
  console.log('Unsubscribe result:', { unsubscribed, message });
  
  if (unsubscribed) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full inline-flex mb-6">
            <Check className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Successfully Unsubscribed</h1>
          <p className="text-muted-foreground mb-8">
            You have been successfully unsubscribed from our newsletter. We&#39;re sorry to see you go.
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
          <h1 className="text-3xl font-bold mb-4">Unsubscribe Failed</h1>
          <p className="text-muted-foreground mb-8">
            {message || "Sorry, we couldn't process your unsubscription request."}
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }
}