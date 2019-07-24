import React, { useState, useEffect } from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text
} from "native-base";
import firebase from "react-native-firebase";
import { useGlobal } from "../../../../GlobalHooks";
import { useNavigation } from "react-navigation-hooks";

export default () => {
  const [state, actions] = useGlobal();
  const { navigate } = useNavigation();

  const [data, setData] = useState({
    email: "",
    pass: ""
  });

  if (state.user) {
    navigate("Availability");
  }

  useEffect(() => {
    if (state.instDetails != null) {
      navigate("Availability");
    } else {
      navigate(""); //add route. if user details not available, redirect to adding user details
    }
  }, [state.user]);

  const onSignup = () => {
    const { email, pass } = data;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then(user => {
        if (user) {
          actions.setInstructor(user.user);
        }
      });
  };

  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              textContentType="emailAddress"
              onChangeText={email => {
                data["email"] = email;
                setData(data);
              }}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input
              textContentType="password"
              onChangeText={pass => {
                data["pass"] = pass;
                setData(data);
              }}
            />
          </Item>
          <Item>
            <Button onPress={onSignup}>
              <Text>Login</Text>
            </Button>
          </Item>
        </Form>
      </Content>
    </Container>
  );
};
