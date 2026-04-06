"use client";

import { Link } from "@/i18n/navigation";
import "./nav-item.css";

interface NavItemProps {
  id: string;
  href: string;
  isActive: boolean;
  icon: string;
  label: string;
  onClick: () => void;
}

const NavItem = ({ id, href, isActive, icon, label, onClick }: NavItemProps) => {
  return (
    <li>
      <Link id={id} href={href} className={`nav-item ${isActive ? "nav-item--active" : ""}`} onClick={onClick}>
        <span className="material-symbols-rounded icon">{icon}</span>
        <p className="nav-item__label">{label}</p>
      </Link>
    </li>
  );
};

export default NavItem;
