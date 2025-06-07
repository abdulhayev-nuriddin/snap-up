import React, { useEffect } from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../store/categorySlice";
import { setSidebarOff } from "../../store/sidebarSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories) || [];

  const handleCloseSidebar = () => {
    dispatch(setSidebarOff());
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-top flex align-center justify-between">
          <h3 className="fs-20">Categories</h3>
          <button
            type="button"
            className="sidebar-close-btn text-dark"
            onClick={handleCloseSidebar}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <ul className="sidebar-nav fs-14 font-manrope">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li className="sidebar-nav-item" key={category.id}>
                <Link
                  to={`category/${category.slug}`}
                  className="sidebar-nav-link text-capitalize"
                  onClick={handleCloseSidebar}
                >
                  {category.name.replace(/-/g, " ")}
                </Link>
              </li>
            ))
          ) : (
            <li className="sidebar-nav-item">No categories available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
