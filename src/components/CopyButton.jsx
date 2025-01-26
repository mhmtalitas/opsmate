import { useState } from 'react'

function CopyButton({ text, mini = false }) {
  const [showFeedback, setShowFeedback] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setShowFeedback(true)
      setTimeout(() => setShowFeedback(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={handleCopy}
        className={`group relative inline-flex items-center transition-all duration-200
          ${mini 
            ? 'p-1.5 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            : 'px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800'
          } rounded-md text-blue-600 dark:text-blue-300 font-medium`}
        title="Copy to clipboard"
      >
        <svg
          className={`${mini ? 'w-3.5 h-3.5' : 'w-4 h-4'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          />
        </svg>
        {!mini && <span className="ml-2">Copy</span>}
        
        {/* Tooltip */}
        {showFeedback && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1
            bg-gray-800 dark:bg-gray-700 text-white text-xs rounded shadow-lg whitespace-nowrap">
            Copied!
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 
              border-4 border-transparent border-t-gray-800 dark:border-t-gray-700" />
          </div>
        )}
      </button>
    </div>
  )
}

export default CopyButton 