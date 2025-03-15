"use client";

import { useState, useEffect } from "react";
import { Mail, X, ArrowRight, Sparkles, Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NewsletterProps {
  onClose?: () => void;
  title?: string;
  description?: string;
}

export function NewsletterBanner({ onClose, title = "🚀 New blog post: Mastering Next.js 14 App Router", description = "Subscribe to receive weekly updates on new articles and exclusive developer tips." }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showNewSubscription, setShowNewSubscription] = useState(false);

  // Check if user is already subscribed on component mount
  useEffect(() => {
    const subscribed = localStorage.getItem("newsletter_subscribed") === "true";
    const subscribedEmail = localStorage.getItem("newsletter_email");
    
    if (subscribed && subscribedEmail) {
      setIsSubscribed(true);
      setEmail(subscribedEmail);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");
    
    try {
      // Replace with actual API endpoint
      // const response = await fetch('/api/newsletter/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // if (!response.ok) throw new Error('Failed to subscribe');
      
      // Save subscription status to localStorage
      localStorage.setItem("newsletter_subscribed", "true");
      localStorage.setItem("newsletter_email", email);
      
      setIsSuccess(true);
      setIsSubscribed(true);
      
      if (onClose) {
        // Auto close banner after success if onClose is provided
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        // Reset success message after delay but keep isSubscribed state
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      }
    } catch (err) {
      setError(`Failed to subscribe. Please try again., ${err} `);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubscribeAnother = () => {
    setShowNewSubscription(true);
    setEmail("");
  };

  // Determine if component is used as banner (has onClose) or section
  const isBanner = !!onClose;

  if (isBanner) {
    // Banner version with close button
    return (
      <div className="relative bg-gradient-to-r from-primary/90 to-primary text-white py-3 px-4 shadow-md">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <span className="font-medium">{title}</span>
          </div>
          
          {isSuccess ? (
            <div className="flex items-center text-green-200">
              <Check className="h-4 w-4 mr-2" />
              <span>Thanks for subscribing! Check your inbox soon.</span>
            </div>
          ) : isSubscribed && !showNewSubscription ? (
            <div className="flex items-center gap-3">
              <div className="text-green-200 flex items-center">
                <Check className="h-4 w-4 mr-2" />
                <span>You&#39;re subscribed with {email}</span>
              </div>
              <button
                onClick={handleSubscribeAnother}
                className="text-xs underline hover:text-white/80 transition-colors flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                <span>Add another</span>
              </button>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit}
              className="flex max-w-md flex-1 gap-2 sm:ml-auto"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={cn(
                    "w-full px-3 py-2 pr-10 rounded-md text-sm text-gray-900 border focus:ring-2 focus:outline-none",
                    error ? "border-red-300 focus:ring-red-500" : "border-transparent focus:ring-blue-400"
                  )}
                  disabled={isSubmitting}
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                {error && (
                  <span className="absolute text-xs text-red-200 left-0 -bottom-5">
                    {error}
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white/90 hover:bg-white text-primary px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-all flex items-center gap-1 hover:shadow-md"
              >
                {isSubmitting ? (
                  <span>Subscribing...</span>
                ) : (
                  <>
                    <span>Join Newsletter</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
          
          <button
            onClick={onClose}
            className="absolute right-3 top-3 p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // Full section version (from original implementation but streamlined)
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-primary/5"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 md:p-10 text-center rounded-2xl bg-background/80 backdrop-blur shadow-lg border border-primary/10">
            
            <div className="inline-block mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <Mail className="mr-2 h-4 w-4" />
                Join the Community
              </span>
            </div>
            
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Stay Updated with My Newsletter
            </h2>
            
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {description}
            </p>
            
            {/* Success Message */}
            {isSuccess && (
              <div className="bg-green-100/30 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center">
                  <div className="mr-2 bg-green-100 dark:bg-green-800/30 rounded-full p-1">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="font-medium">
                    Successfully subscribed to newsletter!
                  </p>
                </div>
              </div>
            )}
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-100/30 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center">
                  <p className="font-medium">{error}</p>
                </div>
              </div>
            )}
            
            {/* Conditionally render form based on subscription status */}
            {(!isSubscribed || showNewSubscription) ? (
              <form 
                onSubmit={handleSubmit}
                className="relative max-w-lg mx-auto"
              >
                <div className="relative flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address" 
                    className="flex h-14 w-full rounded-lg border border-input bg-background px-4 py-2 text-base focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                    required
                  />
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    size="lg"
                    className="h-14 flex items-center justify-center bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Subscribing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Subscribe
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="max-w-lg mx-auto">
                <div className="bg-primary/10 dark:bg-primary/5 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="mr-2 bg-primary/20 rounded-full p-1">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <p className="font-medium text-primary">
                      You&#39;re subscribed to our newsletter
                    </p>
                  </div>
                  
                  <div className="text-muted-foreground mb-6">
                    <p>
                      {email} is receiving our weekly updates.
                    </p>
                  </div>
                  
                  <div className='flex items-center justify-center'>
                    <Button 
                      onClick={handleSubscribeAnother}
                      variant="outline"
                      className="flex items-center justify-center"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Subscribe another email
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <p className="text-xs text-muted-foreground mt-8">
              I respect your privacy. No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}