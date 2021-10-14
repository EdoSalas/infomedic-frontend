import React from "react";
import { Container } from "rbx";
import { Switch, Route } from "react-router-dom";
import { useLocalStorage } from "../hooks";
import Diseases from "./diseases";
import Sintomas from "./Sintomas";
import { ModalProvider } from "../context/ModalContext";
import Navigation from "../components/Navigation";

const Pages = (props) => {
  const [open, setOpen] = useLocalStorage(`MENU_OPEN`, false);
  return (
    <div className="app-container">
      <ModalProvider>
        <main
          className={`container ${open ? "open" : ""}`}
          role="presentation"
          onClick={() => (window.innerWidth < 900 ? setOpen(false) : null)}
          onKeyDown={() => (window.innerWidth < 900 ? setOpen(false) : null)}
        >
          <Navigation open={open} setOpen={setOpen} />
          <div
            className={[
              "section-container",
              "main-page-container",
              open && "open",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <Container fluid>
              <Switch>
                <Route path="/sintomas">
                  <Sintomas />
                </Route>
                <Route path="/">
                  <Diseases />
                </Route>
              </Switch>
            </Container>
          </div>
        </main>
      </ModalProvider>
    </div>
  );
};
Pages.propTypes = {};

export default Pages;