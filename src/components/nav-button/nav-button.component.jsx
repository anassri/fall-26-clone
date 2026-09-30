import "./nav-button.css";
import { Link } from 'react-router';

// label, onclick, isDisabled, isBusy, busyText
export const NavButton = ({ label, onClick, icon, url }) => {
  return (
    <Link className="nav-button" to={url}>
      <img src={icon} width={16} />
      {label}
    </Link>
  );
};
