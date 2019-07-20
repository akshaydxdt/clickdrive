import React, { useState } from "react";
import { Container, Input, Item, Grid, Col, Button, Text } from "native-base";
import Facebook from "../Facebook";
import { useNavigation } from "react-navigation-hooks";
import { primary, primaryText, placeholderLight } from "../../../Res/Colors";
import { useGlobal } from "../../../GlobalHooks";
import firebase from "react-native-firebase";
import { emailValidation } from "../../../Utils";

export default () => {
  const { navigate } = useNavigation();
  const [state, actions] = useGlobal();
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);

  const onLogin = () => {
    if (email && pass) {
      if (emailValidation(email)) {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, pass)
          .then(user => {
            if (user) {
              actions.setUser(user.user);
              navigate("Home");
            }
          });
      } else {
        Toast.show({
          text: "Invalid Email",
          duration: 2000
        });
      }
    } else {
      Toast.show({
        text: "Invalid Email or Password",
        duration: 2000
      });
    }
  };
  return (
    <Container
      style={{
        backgroundColor: primary
      }}
    >
      <Grid
        style={{
          alignItems: "center",
          padding: 18,
          justifyContent: "space-around"
        }}
      >
        <Col>
          <Item style={{ marginBottom: 12 }}>
            <Input
              placeholder="Email"
              placeholderTextColor={placeholderLight}
              style={{
                color: primaryText,
                fontFamily: "Lato-Regular",
                fontSize: 19
              }}
              onChangeText={value => setEmail(value)}
            />
          </Item>
          <Item style={{ marginBottom: 12 }}>
            <Input
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor={placeholderLight}
              style={{
                color: primaryText,
                fontFamily: "Lato-Regular",
                fontSize: 19
              }}
              onChangeText={value => setPass(value)}
            />
          </Item>
          <Button
            light
            bordered
            style={{
              marginTop: 40,
              alignSelf: "stretch",
              justifyContent: "center",
              borderRadius: 15
            }}
            onPress={onLogin}
          >
            <Text
              uppercase={false}
              style={{
                color: primaryText,
                fontSize: 20
              }}
            >
              Login
            </Text>
          </Button>
          <Facebook />
          <Button
            style={{ alignSelf: "center", marginTop: 20 }}
            hasText
            transparent
            onPress={() => {
              navigate("PhoneVerification", { from: "reg" });
            }}
          >
            <Text
              uppercase={false}
              style={{
                color: placeholderLight,
                fontSize: 16
              }}
            >
              Dont have an account? Register
            </Text>
          </Button>
        </Col>
      </Grid>
      {/* <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 15 }}>
        
      </Content> */}
    </Container>
  );
};
