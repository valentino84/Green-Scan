import { Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { useTheme } from './ThemeProvider'
import PropTypes from 'prop-types';
export function ThemeToggle({ size = 'sm', variant = 'ghost' }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className="relative"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

ThemeToggle.propTypes = { /* TODO: add prop names */ };
