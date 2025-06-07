import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSidebarOn } from "../../store/sidebarSlice";
import { getAllCategories } from "../../store/categorySlice";
import { getCartTotal } from "../../store/cartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories) || [];
  const { itemsCount } = useSelector((state) => state.cart);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e) => {
    const value = e.target.value.trim();
    setSearchTerm(value);
  };

  return (
    <nav className="navbar">
      <div className="navbar-cnt flex align-center">
        <div className="brand-and-toggler flex align-center">
          <button
            type="button"
            className="sidebar-show-btn text-white"
            onClick={() => dispatch(setSidebarOn())}
          >
            <i className="fas fa-bars"></i>
          </button>
          <Link to="/" className="navbar-brand flex align-center">
            <span className="navbar-brand-txt mx-2">
              <span className="fw-7">Shop</span>Cart
            </span>
          </Link>
        </div>

        <div className="navbar-collapse w-100">
          <div className="navbar-search bg-white">
            <div className="flex align-center">
              <input
                type="text"
                className="form-control fs-14"
                placeholder="Search your preferred items here"
                value={searchTerm}
                onChange={handleSearchTerm}
              />
              <Link
                to={
                  searchTerm ? `search/${encodeURIComponent(searchTerm)}` : "#"
                }
                className="text-white search-btn flex align-center justify-center"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
            </div>
          </div>

          <ul className="navbar-nav flex align-center fs-12 fw-4 font-manrope">
            {categories.length > 0 ? (
              categories.slice(0, 8).map((category) => (
                <li className="nav-item no-wrap" key={category.id}>
                  <Link
                    to={`category/${category.slug}`}
                    className="nav-link text-capitalize"
                  >
                    {category.name.replace(/-/g, " ")}
                  </Link>
                </li>
              ))
            ) : (
              <li className="nav-item no-wrap">No categories available</li>
            )}
          </ul>
        </div>

        <div className="navbar-cart flex align-center">
          <Link to="/cart" className="cart-btn">
            <i className="fa-solid fa-cart-shopping"></i>
            <div className="cart-items-value">{itemsCount}</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
