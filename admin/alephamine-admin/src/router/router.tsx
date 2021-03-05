import React from "react";
import { Switch, Route } from "react-router-dom";
import UsersPage from "../pages/Users/Users.page";
import HomePage from "../pages/Home/Home.page";
import LoginPage from "../pages/Login/Login.page";
import Sidenav from "../shared/components/Sidenav/Sidenav";
import { Col, Container, Row } from "react-bootstrap";

const MainRouter = () => {
  const isLoggedIn = false;

  return (
    <Container
      fluid
      style={{ padding: 0, margin: 0, height: "100vh", overflow: "hidden" }}
    >
      <Row>
        {isLoggedIn && (
          <Col xs={2}>
            <Sidenav />
          </Col>
        )}
        <Col xs={isLoggedIn ? 10 : 12}>
          {!isLoggedIn ? (
            <Switch>
              <Route exact path="/">
                <LoginPage />
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/users">
                <UsersPage />
              </Route>
            </Switch>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MainRouter;
