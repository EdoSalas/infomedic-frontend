import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Icon, Image } from "rbx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { db } from '../../firebase/firebase-config';
import ClickCapture from "../ClickCapture";
import "./Sidebar.scss";
import { NestedMenu } from "./components";
import { useAuth } from "../../context/AuthContext";
import { getRoutes } from "./routes";
import "../../styles/index.scss";
import logo from "../../styles/logo.png";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  height: fit-content;
  text-align: left;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  transform: translate3d(-295px, 0, 0);
  transition: transform 0.3s linear;
  box-shadow: 20px -9px 20px 0px rgb(0 0 0 / 9%);
  color: white;

  @media (max-width: 768px) {
    transform: translate3d(${({ open }) => (open ? "0px" : "-295px")}, 0, 0);
    transition: transform 0.3s linear;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #0d0c1d;
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: 576px) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: #055a53;
    }
  }
`;

const StyledBurger = styled.button`
  position: absolute;
  top: 15%;
  left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ open }) => (open ? "#0D0C1D" : "#EFFFFA")};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const Container = styled.div`
  flex-grow: 1;
  margin: 0 auto;
  margin-left: 1rem;
  position: relative;
  width: auto;
  max-width: 98%;
  @media screen and (max-width: 900px) {
    max-width: 90%;
  }
`;

function Sidebar({ open, setOpen }) {
  const history = useHistory();
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(false);
  const [activeMenus, setActiveMenus] = useState({});
  const [activeRoute, setActiveRoutes] = useState({});
  const { authState, setAuthState } = useAuth();
  const permissions = ["Main"];
  const routes = getRoutes("Main");
  /* const users = collection(db, "usuarios");
  const [Username, setUserName] = useState("")

  const getUserName = async () =>{ 
    const bdDocs = await getDocs(users);
    const data = bdDocs.docs.map(doc => doc.data());
    // await db.collection("usuarios").get();
    setUserName(data[0].Nombre);
   // return name;
   console.log(Username)
 } */


  const availableRoutes = routes.filter((route) =>
    Array.isArray(route.permissions)
      ? route.permissions?.some((perm) => permissions?.some((x) => perm === x))
      : true
  );

  useEffect(() => {
    setMenuActive(false);
  }, [location.pathname]);




  const toggleActiveMenus = (name) =>
    setActiveMenus((prev) => ({ ...prev, [name]: !activeMenus[name] }));

  const toggleActiveRoutes = (id) => {
    const route = availableRoutes[id];
    if (route.to) {
      history.push(route.to);
      setMenuActive(false);
      if (window.innerWidth < 900) {
        setOpen(false);
      }
    } else {
      setActiveRoutes(availableRoutes[id]);
      setMenuActive(true);
    }
  };

  // close sidebar menu when ESC key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (menuActive && e.keyCode === 27) {
        setMenuActive(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleLogout = () => {
    setAuthState({
      isLoggedIn: false,
      isLoginPending: false,
      loginError: null,
      user: { userid: null },
    });
  }

  // getUserName()

  return (
    <nav className="navigation-bar">
      <ClickCapture onOutsideClick={() => setMenuActive(false)}>
        <Container>
          <div className="navigation">
            <div className="navigation-start">
              <div className="navigation-item">
                <NestedMenu
                  activeMenus={activeMenus}
                  isActive={menuActive}
                  links={activeRoute.links}
                  name={activeRoute.name}
                  toggleMenus={toggleActiveMenus}
                />
              </div>
              {/* <Link
              className="navigation-item navigation-item--brand"
              style={{ display: "flex" }}
              to="/"
            >
              LIMS
            </Link> */}
            </div>
          </div>
        </Container>
        <StyledBurger
          open={open}
          onClick={(e) => {
            e.stopPropagation();
            if (open) {
              setMenuActive(false);
            }
            setOpen((prev) => !prev);
          }}
        >
          <div />
          <div />
          <div />
        </StyledBurger>
        <StyledMenu open={open}>
          <div className="sidebar-header">
            <div className="sidebar-header-item__brand">

              <Link to="/">
                <h3>{authState?.user?.genero === "F" ? "Bienvenida" : "Bienvenido"} {authState?.user?.name} </h3>
              </Link>
              <div className=" title-center">
                <div className="logo1 ">
                  <Image.Container size="10px sq.">
                    <Image src={logo} />
                  </Image.Container>
                </div>

              </div>
            </div>
          </div>
          <div className="header-container">
            <div>

            </div>
          </div>
          <hr />
          <div className="sidebar-menu">
            {availableRoutes.map((r, i) => (
              <div
                key={r.name}
                className={`sidebar-menu-item ${activeRoute === routes[i] && menuActive ? "is-active" : ""
                  } ${r.active?.(location) ? "is-current" : ""}`}
                role="button"
                tabIndex="0"
                onClick={() => toggleActiveRoutes(i)}
                onKeyDown={() => toggleActiveRoutes(i)}
              >
                <Icon size="large">
                  <FontAwesomeIcon icon={r.icon} />
                </Icon>
                <span>{r.label}</span>
              </div>
            ))}
            <div
              className="sidebar-menu-item bottom"
              role="button"
              tabIndex="-1"

            >

              <span onClick={() => handleLogout()}>Salir</span>

            </div>
          </div>
        </StyledMenu>
      </ClickCapture>
    </nav>
  );
}

Sidebar.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

Sidebar.defaultProps = {
  open: false,
  setOpen: () => null,
};

export default Sidebar;
