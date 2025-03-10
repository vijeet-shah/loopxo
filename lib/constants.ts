export const siteConfig = {
    name: 'Shree Laxmi Co-Op Credit Society Ltd',
    description: 'Secure, accessible, and innovative financial solutions',
    mainNav: [
      {
        title: 'Home',
        href: '/',
      },
      {
        title: 'Schemes',
        href: '/schemes',
      },
      {
        title: 'Loans',
        href: '/loans',
      },
      {
        title: 'About',
        href: '/about',
      },
      {
        title: 'Contact',
        href: '/contact',
      },
    ],
    schemes: [
      {
        id: 'lakhpati',
        title: 'Lakhpati Scheme',
        titleHindi: 'लखपति योजना',
        description: 'Make your child a Lakhpati with just ₹1000 monthly investment',
        monthlyDeposit: 1000,
        duration: 75,
        maturityAmount: 100000,
        features: [
          'Low monthly investment',
          'Guaranteed returns',
          'Insurance coverage',
          'Flexible payment options'
        ]
      },
      // Add more schemes
    ],
    loans: [
      {
        id: 'personal',
        title: 'Personal Loan',
        titleHindi: 'व्यक्तिगत कर्ज',
        description: 'Quick personal loans for your immediate needs',
        maxAmount: 500000,
        interestRate: 10.99,
        processingFee: 1,
        features: [
          'Quick approval',
          'Minimal documentation',
          'Flexible repayment',
          'No collateral needed'
        ]
      },
      // Add more loans
    ]
  }