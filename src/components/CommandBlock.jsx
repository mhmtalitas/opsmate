import CopyButton from './CopyButton'

function CommandBlock({ command, description, mini = false }) {
  return (
    <div className="group flex items-start justify-between gap-4 p-3 bg-gray-50 dark:bg-gray-900 
      rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600
      transition-colors duration-200">
      <div className="flex-grow space-y-1">
        <code className="block font-mono text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-blue-600 dark:text-blue-300">
          {command}
        </code>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      <div className={`${mini ? 'opacity-0' : 'opacity-50'} group-hover:opacity-100 transition-opacity duration-200`}>
        <CopyButton text={command} mini={mini} />
      </div>
    </div>
  )
}

export default CommandBlock 