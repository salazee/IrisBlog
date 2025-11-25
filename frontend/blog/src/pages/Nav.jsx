import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, User, LogOut, PenSquare, Home } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchAuthor, setSearchAuthor] = useState("");
  const navigate = useNavigate();

  // Check if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchAuthor.trim()) {
      navigate(`/author/${searchAuthor.trim()}`);
      setMenuOpen(false);
      setSearchAuthor(""); // Clear search after navigation
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold hover:text-purple-200 transition-colors"
          >
            Iris Blog
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search by author..."
                value={searchAuthor}
                onChange={(e) => setSearchAuthor(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-white/20 backdrop-blur-sm 
                         text-white placeholder-white/70 focus:outline-none 
                         focus:ring-2 focus:ring-white/50 w-64"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-white/70" />
            </form>

            {/* Navigation Links */}
            <Link
              to="/"
              className="flex items-center gap-2 hover:text-purple-200 transition-colors"
            >
              <Home className="w-5 h-5" />
              Home
            </Link>

            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-white text-purple-600 
                           hover:bg-purple-50 transition-colors font-semibold"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/create"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg 
                           bg-white text-purple-600 hover:bg-purple-50 
                           transition-colors font-semibold"
                >
                  <PenSquare className="w-5 h-5" />
                  Create Post
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:text-purple-200 transition-colors"
                >
                  <User className="w-5 h-5" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg 
                           bg-red-500 hover:bg-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search by author..."
                value={searchAuthor}
                onChange={(e) => setSearchAuthor(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 
                         backdrop-blur-sm text-white placeholder-white/70 
                         focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-white/70" />
            </form>

            {/* Mobile Links */}
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg 
                       hover:bg-white/10 transition-colors"
            >
              <Home className="w-5 h-5" />
              Home
            </Link>

            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg bg-white/20 
                           hover:bg-white/30 transition-colors text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg bg-white text-purple-600 
                           hover:bg-purple-50 transition-colors font-semibold text-center"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/create"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg 
                           bg-white text-purple-600 hover:bg-purple-50 transition-colors"
                >
                  <PenSquare className="w-5 h-5" />
                  Create Post
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg 
                           hover:bg-white/10 transition-colors"
                >
                  <User className="w-5 h-5" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 
                           rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Menu, X, Search, User, LogOut, Edit, Trash, Home } from "lucide-react";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   // const [searchAuthor, setSearchAuthor] = useState("");
//   const navigate = useNavigate();

//   // check if token exists
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);//The !!token means it endure the  tken value is  a boolean and not strung or undefined. i.e it  convert if to bullen
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-darkpurple text-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto flex justify-between items-center px-6 py-4">
//         {/* Logo */}
//         <Link to="/" className="text-3xl font-bold">
//           Iris Blog
//         </Link>

//         {/* Hamburger Icon (Mobile) */}
//         <button
//           className="md:hidden focus:outline-none"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>

//         {/* Menu Links */}
//         <div
//           className={`flex flex-col md:flex-row md:items-center absolute md:static bg-darkpurple w-full md:w-auto left-0 top-16 md:top-auto transition-all duration-300 ${
//             menuOpen ? "opacity-100" : "opacity-0 md:opacity-100 hidden md:flex"
//           }`}
//         >
          
//           {/* <Link
//             to="/"
//             className=" px-4 py-2 hover:bg-purple-700 rounded-md flex items-center gap-1"
//             onClick={() => setMenuOpen(false)}
//           >
//             <Home size={18} /> Home
//           </Link> */}

//           {/* Search */}
//           <div className="relative my-2 md:my-0 md:ml-4">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="pl-8 pr-4 py-1 rounded-md text-white focus:outline-none"
//             />
//             <Search size={18}
//             onClick={()=>navigate("/getByAuthor/:author")}
//              className="absolute left-2 top-2 text-white" />
//           </div>

//           {/* Conditional Links */}
//           {!isLoggedIn ? (
//             <>
//               <Link
//                 to="/login"
//                 className="block px-4 py-2 hover:bg-purple-700 rounded-md"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="block px-4 py-2 hover:bg-purple-700 rounded-md"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Register
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/profile"
//                 className=" px-4 py-2 hover:bg-purple-700 rounded-md flex items-center gap-1"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 <User size={18} /> Profile
//               </Link>
//               <Link
//                 to="/edit"
//                 className=" px-4 py-2 hover:bg-purple-700 rounded-md flex items-center text-white gap-1"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 <Edit size={18} /> Edit
//               </Link>
//               <Link
//                 to="/delete"
//                 className=" px-4 py-2 hover:bg-purple-700 rounded-md flex items-center gap-1"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 <Trash size={18} /> Delete
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className=" px-4 py-2 hover:bg-purple-700 rounded-md flex items-center gap-1"
//               >
//                 <LogOut size={18} /> Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
