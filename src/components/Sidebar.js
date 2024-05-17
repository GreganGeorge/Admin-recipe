import "./Sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useLocation,useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Logout } from "@mui/icons-material";

const Sidebar = () => {
  const navigate = useNavigate();
  function logout(){
    navigate('/')
  }
  return (
    <div className="sidebar ">
      <div className="top">
        <Link to="/home" style={{ textDecoration: "none" }}>
        <p className="font-bold text-center text-xl">
                        Tasty<span className="text-green-500 text-xl">Byte</span><span className="font-bold text-xl">Admin</span>
                    </p>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/recipe" style={{ textDecoration: "none" }}>
            <li>
              <span>Recipes</span>
            </li>
          </Link>
          <Link to="/ingredient" style={{ textDecoration: "none" }}>
            <li>
              <span>Ingredients</span>
            </li>
          </Link>
          <Link to="/suggestion" style={{ textDecoration: "none" }}>
            <li>
              <span>Suggestions</span>
            </li>
          </Link>
          <li>
            <span onClick={logout}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
      </div>
    </div>
  );
};

export default Sidebar;