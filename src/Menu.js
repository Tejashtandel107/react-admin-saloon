import {
  FiGrid,
  FiUsers,
  FiUser,
  FiMusic,
  FiBook,
  FiBookOpen,
  FiHome,
  FiFileText,
  FiCalendar,
  FiBell,
  FiAward,
  FiLayers,
  FiGlobe,
  FiStar, // 👈 for Premium Plans
  FiCrown, // 👈 not in fi, use FiStar as fallback
  FiUserCheck, // 👈 for Premium Users
} from "react-icons/fi";

const Menu = [
  { heading: "Main Navigation" },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: FiGrid,
  },
  {
    name: "Service",
    path: "/service",
    icon: FiCalendar,
  },
  {
    name: "Booking",
    path: "booking",
    icon: FiUsers,
  },
  {
    name: "Contacts",
    path: "/contact",
    icon: FiFileText,
  }
];

export default Menu;
