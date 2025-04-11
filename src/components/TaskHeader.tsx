
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface TaskHeaderProps {
  className?: string;
}

const TaskHeader = ({ className = "" }: TaskHeaderProps) => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem("task-manager-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setTheme(savedTheme as "dark" | "light");
    } else if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    // Update the HTML class and store the preference
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("task-manager-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className={`flex justify-between items-center mb-6 ${className}`}>
      <div className="flex items-center">
        <h1 className="text-3xl font-bold text-primary">TaskFlow</h1>
      </div>
      <Button variant="ghost" size="icon" onClick={toggleTheme}>
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </header>
  );
};

export default TaskHeader;
