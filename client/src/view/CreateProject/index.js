import React, {useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {Button, Form, Input, TextArea} from "semantic-ui-react";

const CreateProject = () => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    project: "",
  });

  const handleChange = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    console.log(info);

    axios({
      url: "http://localhost:8080/api/save",
      method: "POST",
      data: info,
    })
      .then(() => {
        console.log("data has  been send to the server");
      })
      .catch((error) => {
        console.log(error);
        console.log("data has been not sent the server");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          label="Name"
          placeholder="Name"
          name="name"
          value={info.name}
          onChange={handleChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          value={info.email}
          name="email"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Input
        label="Project"
        placeholder="Project Information"
        value={info.project}
        name="project"
        onChange={handleChange}
      />
      <Form.Field control={Button}>Submit</Form.Field>
    </Form>
  );
};
export default CreateProject;
