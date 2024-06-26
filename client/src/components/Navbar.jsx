import React, { useContext } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../images/Crosspay-Logo.svg";
import { TransactionContext } from "../context/TransactionContext";

const NavBarItem = ({ title, link, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>
    <a href={link}>{title}</a>
  </li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const { currentAccount } = useContext(TransactionContext);

  const navItems = [
    { title: "Live Feed", link: "https://cryptrackersite.netlify.app" },
    { title: "Exchange", link: "https://app.uniswap.org/swap?chain=sepolia" },
    {
      title: "Tracker",
      link: `https://sepolia.etherscan.io/address/${currentAccount}`,
    },
    { title: "Deposit", link: "/deposit" },
    { title: "Withdraw", link: "#" },
  ];

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {navItems.map((item, index) => (
          <NavBarItem
            key={item.title + index}
            title={item.title}
            link={item.link}
          />
        ))}
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {navItems.map((item, index) => (
              <NavBarItem
                key={item.title + index}
                title={item.title}
                link={item.link}
                classprops="my-2 text-lg"
              />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
