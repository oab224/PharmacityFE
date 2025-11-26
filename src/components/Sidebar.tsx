import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";


interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isCollapsed: boolean;
  onCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, isCollapsed, onCollapse }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/",
      label: "Trang chủ",
    },
    {
      path: "/history",
      label: "Lịch sử",
    },
    {
      path: "/stats",
      label: "Thống kê",
    },
    {
      path: "/settings",
      label: "Cài đặt",
    },
  ];

  return (
    <>
      {/* Overlay khi sidebar mở trên mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onToggle}></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""} ${isCollapsed ? "collapsed" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          {!isCollapsed && <h2 className="sidebar-title">Menu</h2>}
          
          {/* Nút thu nhỏ sidebar (chỉ hiện trên desktop) */}
          <button 
            className="sidebar-collapse-btn desktop-only" 
            onClick={onCollapse}
            title={isCollapsed ? "Mở rộng menu" : "Thu nhỏ menu"}
          >
            {isCollapsed ? "→" : "←"}
          </button>

          {/* Nút đóng (chỉ hiện trên mobile) */}
          <button className="sidebar-close mobile-only" onClick={onToggle}>
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => {
                if (window.innerWidth < 768) {
                  onToggle();
                }
              }}
              title={isCollapsed ? item.label : ""}
            >
              <span className="sidebar-label">
                {isCollapsed ? item.label.charAt(0) : item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {!isCollapsed &&
            <>
              <div className="user-info">
                <div className="user-avatar">A</div>
                <div className="user-details">
                  <p className="user-name">Admin</p>
                  <p className="user-email">admin@example.com</p>
                </div>
              </div>
              
            </>
         }
        </div>
      </aside>
    </>
  );
};

export default Sidebar;