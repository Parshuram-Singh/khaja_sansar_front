// components/Sidebar.jsx
import { FaTachometerAlt, FaUser, FaBars, FaShoppingBag, FaBook } from 'react-icons/fa';

const Sidebar = ({setActive}) => {

  // Updated navigation items with React Icons
  const navItems = [
    { icon: <FaTachometerAlt className="mr-3 text-gray-600" />, text: 'Dashboard' },
    { icon: <FaUser className="mr-3 text-gray-600" />, text: 'Users' },
    { icon: <FaBars className="mr-3 text-gray-600" />, text: 'Menu' },
    { icon: <FaShoppingBag className="mr-3 text-gray-600" />, text: 'Subscriptions' },
  ];

  return (
    <aside className="w-64 bg-white text-black h-full shadow-lg flex flex-col">
      <div className="p-6 text-center border-b border-gray-200">
        <h2 className="text-xl font-bold">Khaja sansar</h2>
      </div>
      <nav className="flex-1 mt-4">
        {/* Map over the updated navItems */}
        {navItems.map((item, index) => (
          <a
            key={index}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActive(item.text); // Update the active state
            }}
            className="flex items-center py-3 px-5 hover:bg-blue-100 transition-colors"
          >
            {item.icon}
            <span>{item.text}</span>
          </a>
        ))}
      </nav>
      
    </aside>
  );
};

export default Sidebar;