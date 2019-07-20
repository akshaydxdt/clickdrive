import React from "react";
import { Item, Input, Button, Col, Text } from "native-base";
import { placeholderLight, primaryText } from "../../../Res/Colors";

export default ({ phoneNumber, dispatch, signIn }) => {
  return (
    <Col>
      <Item>
        <Input
          style={{ color: "white", fontFamily: "Lato-Regular" }}
          placeholderTextColor={placeholderLight}
          placeholder={"Enter your phone number"}
          value={phoneNumber}
          onChangeText={value => dispatch({ type: "phInput", data: value })}
        />
      </Item>

      <Button
        light
        disabled={phoneNumber ? false : true}
        bordered
        style={{
          marginTop: 35,
          alignSelf: "stretch",
          justifyContent: "center",
          borderRadius: 15
        }}
        onPress={signIn}
      >
        <Text
          style={{
            color: phoneNumber ? primaryText : placeholderLight,
            fontFamily: "Lato-Regular"
          }}
        >
          Continue
        </Text>
      </Button>
    </Col>
  );
};
