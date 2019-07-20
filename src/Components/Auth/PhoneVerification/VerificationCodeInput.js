import React, { useEffect, useState } from "react";
import {
  Item,
  Input,
  Button,
  Col,
  Text,
  Content,
  Grid,
  Row
} from "native-base";
import { StyleSheet } from "react-native";
import { primaryText, placeholderLight } from "../../../Res/Colors";

const styles = StyleSheet.create({
  gridPad: { padding: 30 },
  txtMargin: { margin: 3 },
  inputRadius: { textAlign: "center" }
});

export default ({ codeInput, timer, signIn, confirmCode, dispatch }) => {
  const otpTextInput = [];
  const [otp, setOtp] = useState("");

  useEffect(() => {
    otpTextInput[0]._root.focus();
  }, []);

  useEffect(() => {
    dispatch({ type: "codeInput", data: otp });
    console.log("otp", otp);
  }, [otp]);

  const renderInputs = () => {
    const inputs = Array(6).fill(0);
    const txt = inputs.map((i, j) => (
      <Col key={j} style={styles.txtMargin}>
        <Item>
          <Input
            style={[
              styles.inputRadius,
              { color: placeholderLight, fontFamily: "Lato-Regular" }
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
    <Grid style={styles.gridPad}>
      <Row>
        <Text
          style={{
            color: "white",
            fontFamily: "Lato-Regular"
          }}
        >
          Enter the code you received via SMS
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
              borderRadius: 15
            }}
            onPress={confirmCode}
          >
            <Text
              style={{
                color: otp ? primaryText : placeholderLight,
                fontFamily: "Lato-Regular"
              }}
              uppercase={false}
            >
              Continue
            </Text>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {timer === 0 ? (
            <Button
              style={{ alignSelf: "center" }}
              disabled={timer === 0 ? false : true}
              hasText
              transparent
              onPress={signIn}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Lato-Regular"
                }}
              >
                Resend
              </Text>
            </Button>
          ) : (
            <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontFamily: "Lato-Regular"
              }}
            >
              Wait: {timer}s to resend the code{" "}
            </Text>
          )}
        </Col>
      </Row>
    </Grid>
  );
};
