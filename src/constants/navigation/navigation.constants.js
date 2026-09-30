import homeIcon from "../../assets/icons/home-icon.png";

export const navigationList = [
  {
    label: "Home",
    onClick: () => window.alert("Home"),
    url:'/',
    icon: homeIcon,
  },
  {
    label: "Explore",
    onClick: () => window.alert("Explore"),
    url:'explore',
    icon: homeIcon,
  },
  {
    label: "Notifications",
    onClick: () => window.alert("Notifications"),
    url: 'notifications',
    icon: homeIcon,
  },
  {
    label: "Bookmarks",
    onClick: () => window.alert("Bookmarks"),
    url: 'bookmarks',
    icon: homeIcon,
  },
  {
    label: "Profile",
    onClick: () => window.alert("Profile"),
    url: 'profile',
    icon: homeIcon,
  },
];
