// components/Navbar.jsx

const Navbar = () => {
  return (
    <header className="flex items-center justify-between bg-white p-4 rounded shadow">
      <div className="text-sm">
        <span className="text-gray-500">Pages / </span>
        <span className="font-medium text-gray-700">Dashboard</span>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-3 py-1"
        />
        <a href="#" className="text-gray-600">
          <i className="fas fa-bell"></i>
        </a>
        <a href="#" className="text-gray-600">
          <i className="fas fa-user"></i>
        </a>
      </div>
    </header>
  );
};

export default Navbar;