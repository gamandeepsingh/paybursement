import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useRef, useState } from "react";
import { toggleTheme } from "@/redux/user/themeSlice";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const {currentUser} = useSelector((state: RootState) => state.user);
  console.log(currentUser);
  

  useEffect(() => {
    // Update the `dark` class on the root element
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const handleToggle = () => {
    dispatch(toggleTheme());
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };
  
  const handleDialogToggle = () => {
    setIsDialogVisible((prev: boolean) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
      setIsDialogVisible(false);
    }
  };

  useEffect(() => {
    if (isDialogVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDialogVisible]);


  return (
    <nav className="z-50 bg-white border border-black text-black  shadow-xl dark:shadow-gray-400/50 flex items-center justify-between fixed bottom-8 left-[50%] -translate-x-[50%] rounded-lg">
      {/* Dialog button */}
      {currentUser && <div className="text-xl font-bold h-full bg-black dark:bg-secondary text-white rounded-l-lg">
        <button
          onClick={handleDialogToggle}
          className="p-4 focus:outline-none transition-transform duration-300 ease-in-out"
          aria-expanded={isDialogVisible}
        >
          <span className="block transition-transform duration-300 ease-in-out">
            {isDialogVisible ? (
                <IoClose
                className="animate-spin"
                />
            ) : (
                <RxHamburgerMenu/>
            )}
          </span>
        </button>
      </div>}
      {/* Navbar links */}
      <div className="flex gap-2 sm:gap-6 px-6 p-2">
        <a
          href="/"
          rel="nofollow"
          className="text-sm w-12 hover:text-secondary transition-colors flex flex-col gap-1 items-center"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="text-xs">Home</span>
        </a>
        <a
          href="/dashboard"
          rel="nofollow"
          className="text-sm w-12 hover:text-secondary transition-colors flex flex-col gap-1 items-center"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span className="text-xs">Dashboard</span>
        </a>
        <a
          href="#"
          rel="nofollow"
          className="text-sm w-12 hover:text-secondary transition-colors flex flex-col gap-1 items-center"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span className="text-xs">Support</span>
        </a>
        <a
          href="#"
          rel="nofollow"
          className="text-sm w-12 hover:text-secondary transition-colors flex flex-col gap-1 items-center"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="text-xs">Cart</span>
        </a>
      </div>
      {/* Dialog Content */}
      <div
        className={`absolute bottom-[125%] left-0 w-full sm:w-[calc(100vw_-_48px)] max-w-lg transform transition-all duration-300 ease-in-out ${
          isDialogVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div ref={dialogRef} 
        className="p-8 bg-white shadow-lg absolute bottom-[125%] left-[0%] flex w-full sm:w-[calc(100vw_-_48px)] max-w-lg">
          <div className="flex flex-col gap-2 w-1/3">
            <h4 className="text-sm mb-2 font-semibold">Owner</h4>
            <a
              href="#"
              rel="nofollow"
              className="text-sm hover:text-secondary transition-colors flex items-center gap-2"
            >
              Employees
            </a>
            <a
              href="#"
              rel="nofollow"
              className="text-sm hover:text-secondary transition-colors flex items-center gap-2"
            >
              Total Amount
            </a>
            <a
              href="#"
              rel="nofollow"
              className="text-sm hover:text-secondary transition-colors flex items-center gap-2"
            >
              History
            </a>
            <a
              href="#"
              rel="nofollow"
              className="text-sm hover:text-secondary transition-colors flex items-center gap-2"
            >
              Pending
            </a>
          </div>
          <div className="flex flex-col gap-2 w-1/3">
            <h4 className="text-sm mb-2 font-semibold">Employee</h4>
            <a
              href="#"
              rel="nofollow"
              className="text-sm hover:text-secondary transition-colors flex items-center gap-2"
            >
              Complete
            </a>
            <a
              href="#"
              rel="nofollow"
              className="text-sm hover:text-secondary transition-colors flex items-center gap-2"
            >
              Pending
            </a>
            <a
              href="#"
              rel="nofollow"
              className="text-sm hover:text-secondary transition-colors flex items-center gap-2"
            >
              Upcoming
            </a>
          </div>
          <div className="flex flex-col gap-2 w-1/3">
            <h4 className="text-sm mb-2 font-semibold">Other</h4>
            <span
              rel="nofollow"
              className="text-sm hover:text-secondary transition-colors flex items-center gap-2 cursor-pointer"
              onClick={handleToggle}
            >
              Change theme
            </span>
            <a
              href="#"
              rel="nofollow"
              className="text-sm hover:text-secondary transition-colors flex items-center gap-2"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
