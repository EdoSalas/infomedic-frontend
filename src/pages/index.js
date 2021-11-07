import React from "react";
import { Container } from "rbx";
import { Switch, Route } from "react-router-dom";
import { useLocalStorage } from "../hooks";
import Diseases from "./Diseases";
import Symptom from "./Symptom";
import RiskFactors from "./RiskFactors";
import Stadistics from "./Stadistics";
import Recomendations from "./Recomendations";
import Configuration from "./Configuration";
import { ModalProvider } from "../context/ModalContext";
import Navigation from "../components/Navigation";
import { useAuth } from "../context";
import LandingPage from "./LandingPage/LandingPage";

const Pages = (props) => {
  const { authState } = useAuth();
  const [open, setOpen] = useLocalStorage(`MENU_OPEN`, false);

  return authState.isLoggedIn ? (
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
            {authState.user.type === 0 && (<Container fluid>
              <Switch>
                <Route path="/symptom">
                  <Symptom />
                </Route>
                <Route path="/stadistics">
                  <Stadistics />
                </Route>
                <Route path="/recomendations">
                  <Recomendations />
                </Route>
                <Route path="/configuration">
                  <Configuration />
                </Route>
                <Route path="/">
                  <Symptom />
                </Route>
              </Switch>
            </Container>)}
            {authState.user.type === 1 && (
              <Container fluid>
                <Switch>
                  <Route path="/diseases">
                    <Diseases />
                  </Route>
                  <Route path="/symptom">
                    <Symptom />
                  </Route>
                  <Route path="/risk">
                    <RiskFactors />
                  </Route>
                  <Route path="/recomendations">
                  <Recomendations />
                </Route>
                <Route path="/configuration">
                  <Configuration />
                </Route>
                  <Route path="/">
                    <Diseases />
                  </Route>
                </Switch>
              </Container>
            )}

          </div>
        </main>
      </ModalProvider>
    </div>
  ) : (
    <LandingPage />
  );
};
Pages.propTypes = {};

export default Pages;
