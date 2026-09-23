import "./nav-button.css";

// label, onclick, isDisabled, isBusy, busyText
export const NavButton = ({ label, onClick, icon }) => {
  return (
    <button className="nav-button" onClick={onClick}>
      <img src={icon} width={16} />
      {label}
    </button>
  );
};
