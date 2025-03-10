export interface Scheme {
    id: string
    title: string
    titleHindi: string
    description: string
    monthlyDeposit: number
    duration: number
    maturityAmount: number
    features: string[]
  }
  
  export interface Loan {
    id: string
    title: string
    titleHindi: string
    description: string
    maxAmount: number
    interestRate: number
    processingFee: number
    features: string[]
  }
  
  export interface NavItem {
    title: string
    href: string
    description?: string
  }