import React from "react";
import Header from "../Header/Header";
import {useHistory} from "react-router-dom";
import {Button, Container, Menu} from "semantic-ui-react";
import useReactRouter from "use-react-router";


const Home = (props) => {
  const {history, location ,match} = useReactRouter();
  const handleProject = () => {
    history.push('/create-project');
  };

  return (
    <React.Fragment>
      <Button onClick={handleProject}>
        project
      </Button>
      <h1>This is Home</h1>
    </React.Fragment>
  )
};

export default Home;