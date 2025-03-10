export function SkipToContent() {
    return (
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-primary focus:text-white focus:z-50"
      >
        Skip to main content
      </a>
    )
  }