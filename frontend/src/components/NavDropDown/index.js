import React, { useState, useEffect } from "react";
import LoggedInDropDown from "./LoggedInDropDown";
import LoggedOutDropDown from "./LoggedOutDropDown";
import "./NavDropDown.css";

function NavDropDown({ user }) {
  const [showMenu, setShowMenu] = useState(false);

  let dropDownLinks;
  if (user) {
    dropDownLinks = <LoggedInDropDown user={user} />;
  } else {
    dropDownLinks = <LoggedOutDropDown />;
  }
    
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div className="right-nav">
      <button className="menu-button" onClick={openMenu}>
        <i id="hamburger-icon" className="fa-sharp fa-solid fa-bars" />
        <i id="user-icon" className="fa-solid fa-user-circle" />
      </button>
      
      {showMenu && (
        <ul className="profile-dropdown">
          {dropDownLinks}
        </ul>
      )}
    </div>
  );
}

export default NavDropDown;