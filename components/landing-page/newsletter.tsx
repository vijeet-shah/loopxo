'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle, Mail, ArrowRight, Plus } from 'lucide-react';
import TechnologyTicker from './technologyTicker';

export default function Newsletter({ t }:{t: any}) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showNewSubscription, setShowNewSubscription] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false});
  
  // Check if user is already subscribed on component mount
  useEffect(() => {
    const subscribed = localStorage.getItem('newsletter_subscribed') === 'true';
    const subscribedEmail = localStorage.getItem('newsletter_email');
    
    if (subscribed) {
      setIsSubscribed(true);
      // Store the subscribed email to display it later
      if (subscribedEmail) {
        setEmail(subscribedEmail);
      }
    }
  }, []);
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setNeedsConfirmation(false);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      if (data.message && data.message.includes('mailbox to confirm')) {
        setNeedsConfirmation(true);
      }

      // Save subscription status to localStorage
      localStorage.setItem('newsletter_subscribed', 'true');
      localStorage.setItem('newsletter_email', email);
      
      setSuccess(true);
      setIsSubscribed(true);
      
      // Reset success message after 8 seconds but keep isSubscribed state
      setTimeout(() => {
        setSuccess(false);
        setNeedsConfirmation(false);
      }, 8000);
    } catch (error :any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribeAnother = () => {
    setShowNewSubscription(true);
    setEmail('');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  
 

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background with cosmos effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      <div className="absolute inset-0 bg-[url('/nebula-pattern.svg')] opacity-20 bg-repeat"></div>
      
      {/* Animated stars and decorative elements */}
      <motion.div
        animate={{ 
          rotate: 360, 
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{ 
          rotate: { repeat: Infinity, duration: 30, ease: "linear" },
          scale: { repeat: Infinity, duration: 8, ease: "easeInOut" },
          opacity: { repeat: Infinity, duration: 4, ease: "easeInOut" }
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle, transparent 40%, hsl(var(--primary)) 70%)', backgroundSize: '5px 5px' }}
      />
      
      {/* Floating stars */}
      
      
    
     
      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-3xl mx-auto"
        >
          {/* Cosmic card effect for the newsletter container */}
          <motion.div 
            className="cosmic-card p-8 md:p-10 text-center rounded-2xl"
            whileHover={{ 
              boxShadow: "0 20px 60px -20px hsla(var(--primary) / 0.3), 0 10px 30px -15px hsla(var(--primary-gradient-to) / 0.2)"
            }}
          >
            <motion.div
              variants={itemVariants}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <Mail className="mr-2 h-4 w-4" />
                {t?.joinNewsletter || "Join the Community"}
              </span>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="cosmic-text text-4xl font-bold mb-4"
            >
              {t?.newsletterTitle || "Stay Updated with My Newsletter"}
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              {t?.newsletterDescription || "Subscribe to receive weekly updates on new articles, resources, and exclusive developer tips to help you level up your skills."}
            </motion.p>
            
            {/* Success Message */}
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel bg-green-100/30 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-lg p-4 mb-6"
              >
                <div className="flex items-center justify-center">
                  <div className="mr-2 bg-green-100 dark:bg-green-800/30 rounded-full p-1">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="font-medium">
                    {needsConfirmation 
                      ? (t?.checkEmailConfirmation || "Please check your email to confirm your subscription") 
                      : (t?.subscriptionSuccess || "Successfully subscribed to newsletter!")}
                  </p>
                </div>
              </motion.div>
            )}
            
            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel bg-red-100/30 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-lg p-4 mb-6"
              >
                <div className="flex items-center justify-center">
                  <div className="mr-2 bg-red-100 dark:bg-red-800/30 rounded-full p-1">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <p className="font-medium">{error}</p>
                </div>
              </motion.div>
            )}
            
            {/* Conditionally render form based on subscription status */}
            {(!isSubscribed || showNewSubscription) ? (
              <motion.form 
                onSubmit={handleSubmit}
                variants={itemVariants}
                className="relative max-w-lg mx-auto"
              >
                <div className="relative flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t?.email || "Your email address"} 
                    className="flex h-14 w-full rounded-lg border border-input bg-background/80 backdrop-blur px-4 py-2 text-base shadow-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                    required
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    size="lg"
                    className="cosmic-button h-14 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t?.subscribing || "Subscribing..."}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        {t?.subscribeButton || "Subscribe"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
                
                {/* Decorative glow effect under the input */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-primary/20 filter blur-xl rounded-full"></div>
              </motion.form>
            ) : (
              <motion.div 
                variants={itemVariants}
                className="max-w-lg mx-auto"
              >
                <div className="glass-panel bg-primary/10 dark:bg-primary/5 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="mr-2 bg-primary/20 rounded-full p-1">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <p className="font-medium text-primary">
                      {t?.alreadySubscribed || "You're subscribed to our newsletter"}
                    </p>
                  </div>
                  
                  <div className="text-muted-foreground mb-6">
                    <p>
                      {localStorage.getItem('newsletter_email') || "Your email"} {t?.subscribedMessage || "is receiving our weekly updates."}
                    </p>
                  </div>
                  
                  <div className='flex items-center justify-center'>
                  <Button 
                    onClick={handleSubscribeAnother}
                    className="cosmic-button flex items-center justify-center"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {t?.subscribeAnother || "Subscribe another email"}
                  </Button>
                  </div>
                </div>
              </motion.div>
            )}
            
            <motion.p 
              variants={itemVariants}
              className="text-xs text-muted-foreground mt-8"
            >
              {t?.privacyNotice || "I respect your privacy. No spam, ever. Unsubscribe anytime."}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
      <TechnologyTicker/>
    </section>
  );
}