import React from "react";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg p-2"
      style={{ backgroundColor: "var(--color-lighter)" }}
    >
      <a className="navbar-brand d-flex align-items-baseline" href="#">
        <h3 className="m-0">CandyCrush</h3>
        <p className="m-0" style={{ fontSize: "0.9em" }}>
          &nbsp;&nbsp;- <s>Almost</s> another replica...
        </p>
      </a>
    </nav>
  );
};

export default Navbar;
