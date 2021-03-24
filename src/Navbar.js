import "./Navbar.css";
import { Link, matchPath, useLocation } from "react-router-dom";
import { capitalize } from "./utilities.js";

const Navbar = () => {
    const pages = [
        { name: "home", path: "/" },
        { name: "transactions", path: "/transactions"},
        { name: "categories", path: "/categories"}
    ];

    const location = useLocation();

    return (
        <div className="navbar">
            <div className="links">
                { pages.map( page => (
                    <Link 
                        key={ page.path } 
                        to={ page.path } 
                        className={ matchPath(location.pathname, {path: page.path, exact: true} ) ? "color3 background-color2" : "color2 hover-color2"}
                    >
                        { capitalize(page.name) }
                    </Link>
                ))}
            </div>

            <div className="separator background-color1"></div>
        </div>
    );
}
 
export default Navbar;