"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  // Use a consistent placeholder during server rendering & before client hydration
  return (
    <Button variant="outline" size="icon" onClick={mounted ? handleThemeToggle : undefined}>
      {!mounted ? (
        // Use a neutral or invisible placeholder that matches the size
        <div className="h-5 w-5" aria-hidden="true" />
      ) : resolvedTheme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}