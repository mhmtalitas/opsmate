const Logo = ({ className = "w-8 h-8" }) => {
  return (
    <div className="flex items-center space-x-3">
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dış çember - sonsuz döngüyü temsil eder (CI/CD) */}
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-blue-500"
        />
        
        {/* İç bağlantılar - entegrasyonu temsil eder */}
        <path
          d="M12 7L16 12L12 17L8 12L12 7Z"
          fill="currentColor"
          className="text-blue-600"
        />
        
        {/* Merkezdeki nokta - otomasyonu temsil eder */}
        <circle
          cx="12"
          cy="12"
          r="2"
          fill="currentColor"
          className="text-blue-700"
        />
      </svg>
      <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent tracking-tight">
        OpsMate
      </span>
    </div>
  );
};

export default Logo; 