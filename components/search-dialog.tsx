// components/search-dialog.tsx
"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const openSearchDialog = () => {
    console.log(isOpen);
    setIsOpen(true)
  }

  return (
    <button
      onClick={openSearchDialog}
      className="rounded-md p-2 hover:bg-muted"
      aria-label="Search"
    >
      <Search className="h-5 w-5" />
    </button>
  )
}