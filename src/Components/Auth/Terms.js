import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
  Button,
  Text,
  Spinner,
  CheckBox,
  ListItem,
  Body
} from "native-base";
import { View, Image } from "react-native";
import { primary, primaryText, placeholderLight } from "../../Res/Colors";
import { useNavigation } from "react-navigation-hooks";
export default () => {
  const { navigate } = useNavigation();
  const [accept, setAccept] = useState(false);

  const onContinue = () => {
    if (accept) {
      navigate("RegComplete");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: primary
      }}
    >
      <Text style={{ color: primaryText, textAlign: "center" }}>
        Please accept the Terms and Conditions to continue
      </Text>
      <Button transparent style={{ alignSelf: "flex-end" }}>
        <Text style={{ color: placeholderLight }} uppercase={false}>
          Read Here
        </Text>
      </Button>

      <View
        style={{ alignSelf: "stretch", flexDirection: "row", marginTop: 5 }}
      >
        <CheckBox
          color={placeholderLight}
          checked={accept}
          onPress={() => {
            setAccept(accept => !accept);
          }}
        />
        <Text
          style={{
            color: primaryText,
            fontFamily: "Lato-Light",
            marginLeft: 15
          }}
        >
          I accept
        </Text>
      </View>

      <Button
        light
        bordered
        disabled={accept ? false : true}
        style={{
          marginTop: 40,
          alignSelf: "stretch",
          justifyContent: "center",
          borderRadius: 15
        }}
        onPress={onContinue}
      >
        <Text
          uppercase={false}
          style={{
            color: accept ? primaryText : placeholderLight,
            fontSize: 20
          }}
        >
          Continue
        </Text>
      </Button>
    </View>
  );
};
