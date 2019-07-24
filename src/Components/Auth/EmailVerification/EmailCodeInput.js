import React, { useState, useEffect } from "react";
import { Item, Input, Button, Col, Text, Grid, Row } from "native-base";
import { StyleSheet } from "react-native";
import { primaryText } from "../../../Res/Colors";

const styles = StyleSheet.create({
  gridPad: { padding: 30 },
  txtMargin: { margin: 3 },
  inputRadius: { textAlign: "center" }
});

export default ({
  email,
  confirmCode,
  setCode,
  setMode,
  onEdit,
  setServerOTP
}) => {
  const otpTextInput = [];
  const [otp, setOtp] = useState("");

  useEffect(() => {
    otpTextInput[0]._root.focus();
  }, []);

  useEffect(() => {
    setCode(otp);
  }, [otp]);

  //rendering each individual input
  const renderInputs = () => {
    const inputs = Array(4).fill(0);
    const txt = inputs.map((i, j) => (
      <Col key={j} style={styles.txtMargin}>
        <Item>
          <Input
            style={[
              styles.inputRadius,
              { color: primaryText, fontFamily: "Lato-Regular" }
            ]}
            keyboardType="numeric"
            onChangeText={v => focusNext(j, v)}
            onKeyPress={e => focusPrevious(e.nativeEvent.key, j)}
            ref={ref => (otpTextInput[j] = ref)}
          />
        </Item>
      </Col>
    ));
    return txt;
  };

  const focusPrevious = (key, index) => {
    //console.log(index);
    if (key === "Backspace" && index !== 0) {
      otpTextInput[index - 1]._root.focus();
      setOtp(otp => otp.substring(0, otp.length - 1));
    }
  };

  const focusNext = (index, value) => {
    setOtp(otp => otp + value);
    if (index < otpTextInput.length - 1 && value) {
      otpTextInput[index + 1]._root.focus();
    }
  };

  return (
    <Grid>
      <Row style={{ alignItems: "center" }}>
        <Text
          style={{
            color: primaryText,
            fontFamily: "Lato-Regular",
            textAlign: "center",
            alignContent: "center",
            width: "100%"
          }}
        >
          Enter the code sent to {email}
        </Text>
      </Row>
      <Row>{renderInputs()}</Row>
      <Row>
        <Col>
          <Button
            light
            bordered
            style={{
              alignSelf: "stretch",
              justifyContent: "center",
              borderRadius: 15,
              marginTop: 25
            }}
            onPress={confirmCode}
          >
            <Text
              uppercase={false}
              style={{ color: primaryText, fontFamily: "Lato-Regular" }}
            >
              Continue
            </Text>
          </Button>
        </Col>
      </Row>
      <Col
        style={{ alignSelf: "stretch", alignItems: "center", marginTop: 25 }}
      >
        <Row>
          <Button hasText transparent>
            <Text
              uppercase={false}
              style={{ color: primaryText, fontFamily: "Lato-Regular" }}
            >
              I didn’t receive a code
            </Text>
          </Button>
        </Row>
        <Row>
          <Button
            hasText
            transparent
            onPress={() => {
              setMode("input");
            }}
          >
            <Text
              uppercase={false}
              style={{ color: primaryText, fontFamily: "Lato-Regular" }}
            >
              Edit or Change your email ID
            </Text>
          </Button>
        </Row>
      </Col>
    </Grid>
  );
};
