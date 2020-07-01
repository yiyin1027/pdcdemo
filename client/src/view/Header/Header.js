import {Button, Container, Menu} from "semantic-ui-react";
import Router from "../../Router";
import React, {useEffect, useState} from "react";
import useReactRouter from "use-react-router";
import axios from 'axios';
import {Link, NavLink, withRouter} from 'react-router-dom'

const Header = (props) => {
  const {history, location, match} = useReactRouter();

  const [userInfo, setUserInfo] = useState({
    user: {},
    error: null,
    authenticated: false
  });

  const handleLogin = () => {
    window.open("http://localhost:8080/auth/login", "_self");

  };

  const handleLogout = () => {
    window.open("http://localhost:8080/auth/logout", "_self")

  };

  const handleHome = () => {
    history.push('/');
  };

  const handleProjectList = () => {
    if (userInfo.authenticated) {
      history.push('/create-project');
    } else {
      console.log("you haven't logged in");
    }
  };


  useEffect(() => {
    // res.json()?
    axios.get('http://localhost:8080/auth/login/success', {
      withCredentials: true
    })
      .then(res => {
        console.log(res);
        return res.data;
      })
      .then(data => {
        setUserInfo({
          ...userInfo,
          user: data.user,
          authenticated: data.authenticated,
        })
      })
      .catch(e => {
        console.log(e);
      })
  }, []);

  let button;
  if(userInfo.authenticated) {
    button = <Button onClick={handleLogout} as="a" inverted>Log out</Button>;
  } else {
    button = <Button onClick={handleLogin} as="a" inverted>Log in</Button>;
  }


  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header>
            Professional Development Club
          </Menu.Item>
          <Menu.Item as="a" onClick={handleHome}>Home</Menu.Item>
          <Menu.Item as="a" onClick={handleProjectList}>Project</Menu.Item>
          <Menu.Item position="right">
            {/*<Button onClick={handleLogin} as="a" inverted>*/}
            {/*  Log in*/}
            {/*</Button>*/}
            {/*<Button onClick={handleLogout} as="a" inverted>*/}
            {/*  Log out*/}
            {/*</Button>*/}
            {button}
          </Menu.Item>
        </Container>
      </Menu>
      <h1> {userInfo.authenticated ? "Welcome " + userInfo.user.name : "Please log in"}</h1>
    </div>
  );
};

export default Header;