import React, { useState } from "react";
import {
  Item,
  Input,
  Button,
  Col,
  Text,
  Toast,
  Spinner,
  Grid
} from "native-base";
import { primaryText, placeholderLight } from "../../../Res/Colors";
import { emailValidation } from "./../../../Utils/index";

export default ({ email, setEmail, setMode, setServerOTP }) => {
  const [spin, setSpin] = useState(false);

  const url = "https://clickdrive.herokuapp.com/verify?email=";
  const onNext = () => {
    if (emailValidation(email)) {
      setSpin(true);
      try {
        fetch(url + email, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            console.log("res", res);
            if (res.status === 200) {
            }
            return res.json();
          })
          .then(data => {
            console.log("otp", data);

            setServerOTP(data.otp);
            setSpin(false);
            setMode("codeInput");
          })
          .catch(error => {
            console.log("error", error);
            setSpin(false);
            throw error;
          });
      } catch (error) {
        console.log("error", error);
        setSpin(false);
      }
    } else {
      Toast.show({
        text: "Enter a valid e-mail",
        duration: 2000
      });
    }
  };
  return (
    <Grid style={{ alignItems: "center" }}>
      <Col>
        <Item>
          <Input
            style={{ color: primaryText, fontFamily: "Lato-Regular" }}
            placeholderTextColor={placeholderLight}
            placeholder={"Enter your email ID"}
            value={email}
            onChangeText={value => setEmail(value)}
          />
        </Item>

        <Button
          light
          bordered
          disabled={email ? false : true}
          style={{
            marginTop: 40,
            alignSelf: "stretch",
            justifyContent: "center",
            borderRadius: 15
          }}
          onPress={onNext}
        >
          {spin ? (
            <Spinner color={primaryText} />
          ) : (
            <Text
              style={{
                color: email ? primaryText : placeholderLight,
                fontFamily: "Lato-Regular"
              }}
              uppercase={false}
            >
              Continue
            </Text>
          )}
        </Button>
      </Col>
    </Grid>
  );
};
