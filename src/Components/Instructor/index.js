import React, { Component } from "react";
import { Text, View } from "react-native";

import { Container, Content } from "native-base";
import Login from "./Auth/Login";
import Registration from "./Auth/Registration";

export default class extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Registration />
        </Content>
      </Container>
    );
  }
}
