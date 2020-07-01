import React, {useEffect, useState} from "react";
import Routers from "./Router";
import "semantic-ui-css/semantic.min.css";
import {Menu, Container, Button} from "semantic-ui-react";
import CreateProject from "./view/CreateProject";
import Header from "./view/Header/Header";

const App = () => {

  return (
    <React.Fragment>
      <Container text style={{marginTop: "7em"}}>
        <Routers/>
      </Container>
    </React.Fragment>
  );
};

export default App;
