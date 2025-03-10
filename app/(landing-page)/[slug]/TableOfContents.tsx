'use client'

import { useState, useEffect } from 'react'
import { Heading } from '@/lib/markdownToHtml'
import { useTranslation } from '@/lib/i18n/client-utils';

type TableOfContentsProps = {
  headings: Heading[]
  tableTitle?: string
}

export default function TableOfContents({ headings, tableTitle = "Table of Contents" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');
  const { lang } = useTranslation();
  
  // Only Arabic and Hebrew are truly RTL languages
  const isRTL = lang === 'ar' || lang === 'he';
  // Special handling for Hindi (not RTL)
  const isHindi = lang === 'hi';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -80% 0px' }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    
    if (element) {
      // Calculate position
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - 96 // 96px = header + extra space

      // Scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      // Update URL without triggering scroll
      history.pushState(null, '', `#${id}`)
      setActiveId(id)
    }
  }

  return (
    <nav className={`sticky top-24 ${isRTL ? 'text-right' : ''} ${isHindi ? 'font-hindi' : ''}`} 
         dir={isRTL ? 'rtl' : 'ltr'}>
      <h2 className="text-xl font-bold mb-4 text-primary">{tableTitle}</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`
              ${heading.level === 2 ? '' : isRTL ? 'mr-4' : 'ml-4'}
              ${activeId === heading.id ? 'text-primary font-medium' : 'text-gray-500 dark:text-gray-400'}
            `}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className="hover:text-primary transition-colors inline-block py-1"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}