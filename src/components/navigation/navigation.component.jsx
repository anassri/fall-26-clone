import { NavButton } from "../nav-button/nav-button.component";
import "./navigation.css";
import { navigationList } from "../../constants/navigation/navigation.constants";

export const Navigation = () => {
  return (
    <div className="navigation-container">
      {navigationList.map((item) => (
        <NavButton key={item.label} {...item} />
        // <NavButton label={item.label} onClick={item.onClick} icon={item.icon} />
      ))}
    </div>
  );
};
