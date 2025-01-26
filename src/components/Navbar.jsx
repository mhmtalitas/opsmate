import Logo from './Logo'

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center h-16">
          <div className="flex items-center">
            <Logo className="w-8 h-8" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 