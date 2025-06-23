import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from "../components/Navbar";
const Layout = ({ children }) => {
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx("main", { className: "container mx-auto p-4", children: children })] }));
};
export default Layout;
