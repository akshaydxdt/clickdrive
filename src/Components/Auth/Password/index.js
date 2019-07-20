import React, { useState } from "react";
import { View } from "react-native";
import { Item, Input, Text, Button, Toast } from "native-base";
import { primary, primaryText, placeholderLight } from "../../../Res/Colors";
import { useNavigation } from "react-navigation-hooks";
import { useGlobal } from "../../../GlobalHooks";
import { passwordValidation } from "../../../Utils";

export default () => {
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [state, actions] = useGlobal();

  const { navigate } = useNavigation();

  const onContinue = () => {
    if (passwordValidation(pass) && passwordValidation(confPass)) {
      if (pass === confPass) {
        actions.setPass(pass);
        navigate("DOB");
      } else {
        Toast.show({
          text: "Password mismatch",
          duration: 2000,
          buttonText: "Okay"
        });
      }
    } else {
      Toast.show({
        text: "Enter a valid 8 character password",
        duration: 2000,
        buttonText: "Okay"
      });
    }
    // if (confPass === "" || pass === "") {
    //   Toast.show({
    //     text: "Enter a Password to continue",
    //     duration: 2000,
    //     buttonText: "Okay"
    //   });
    // } else {

    // }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: primary,
        padding: 30
      }}
    >
      <Item style={{ marginTop: 40 }}>
        <Input
          secureTextEntry={true}
          placeholder="Enter your Password"
          placeholderTextColor={placeholderLight}
          style={{ fontFamily: "Lato-Regular", color: primaryText }}
          onChangeText={value => {
            setPass(value);
          }}
        />
      </Item>
      <Item style={{ marginTop: 40 }}>
        <Input
          secureTextEntry={true}
          placeholder="Confirm your Password"
          placeholderTextColor={placeholderLight}
          style={{ fontFamily: "Lato-Regular", color: primaryText }}
          onChangeText={value => {
            setConfPass(value);
          }}
        />
      </Item>
      <Button
        disabled={pass != "" ? false : true}
        light
        bordered
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
            color: pass != "" ? primaryText : placeholderLight,
            fontSize: 20
          }}
        >
          Continue
        </Text>
      </Button>
    </View>
  );
};
