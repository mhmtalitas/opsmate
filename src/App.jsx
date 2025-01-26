import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import ToolGuide from './components/ToolGuide'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main>
          <ToolGuide />
        </main>
        <ThemeToggle />

        <footer className="bg-gray-800 dark:bg-gray-950 text-gray-400 mt-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col items-center space-y-2">
              <p className="text-center">&copy; 2024 OpsMate. All rights reserved.</p>
              <div className="flex items-center space-x-2 text-sm">
                <span>Developed by</span>
                <a 
                  href="https://github.com/mhmtalitas" 
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Mehmet Ali Taş
                </a>
              </div>
              <a 
                href="mailto:info@opsmate.dev" 
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                info@opsmate.dev
              </a>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App 