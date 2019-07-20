import React, { useState } from "react";
import { Container, Content, Button, Text } from "native-base";
import Login from "./Login";
import Registration from "./Registration";
import PhoneVerification from "./PhoneVerification";
import { useGlobal } from "../../../GlobalHooks";

export default () => {
  const [state, actions] = useGlobal();
  const [mode, setMode] = useState("login");
  const [phone, setPhone] = useState("");

  const renderMode = () => {
    switch (mode) {
      case "login":
        return (
          <Content>
            <Button
              onPress={() => {
                setMode("reg");
              }}
            >
              <Text>Register</Text>
            </Button>
            <Login />
          </Content>
        );
      case "reg":
        return (
          <Content>
            <Button
              onPress={() => {
                setMode("login");
              }}
            >
              <Text>Login</Text>
            </Button>
            <Registration
              onPhone={phone => setPhone(phone)}
              onDone={mode => setMode(mode)}
            />
          </Content>
        );

      case "phone":
        return <PhoneVerification phone={phone} />;

      default:
        return <Login />;
    }
  };

  return (
    <Container>
      <Content>{renderMode()}</Content>
    </Container>
  );
};
