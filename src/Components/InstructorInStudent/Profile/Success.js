import React, { useEffect } from "react";
import { Text } from "native-base";
import { View, Image } from "react-native";
import successImageUri from "../../../Res/success.png";
import { primary } from "../../../Res/Colors";
import { useNavigation } from "react-navigation-hooks";

export default () => {
  const { navigate } = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("Home");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: primary
      }}
    >
      <Text
        style={{
          fontSize: 25,
          color: "white",
          fontFamily: "Lato-Regular",
          marginBottom: 25,
          textAlign: "center"
        }}
      >
        Your session was booked successfully!
      </Text>
      <Image source={successImageUri} style={{ width: 100, height: 100 }} />
    </View>
  );
};
