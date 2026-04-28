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
    name: "Contact Details",
    path: "/contact",
    icon: FiFileText,
  },
  {
    name: "Contact Requests",
    path: "/contact-us",
    icon: FiUser,
  },
  {
    name: "FAQ",
    path: "/faq",
    icon: FiBookOpen,
  }
];

export default Menu;
