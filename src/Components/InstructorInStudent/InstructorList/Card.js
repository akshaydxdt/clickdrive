import React, { useState, useEffect } from "react";
import {
  Text,
  Card,
  Content,
  Thumbnail,
  Footer,
  FooterTab,
  Button,
  Icon,
  Container,
  View
} from "native-base";
import { primary, primaryText, borderColor } from "../../../Res/Colors";
import guy from "../../../Res/guy.jpg";
import { useNavigation } from "react-navigation-hooks";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default ({ name, desc, onSelect, onCancel }) => {
  const [active, setActive] = useState(false);
  const [cancel, setCancel] = useState(false);

  //const { navigate } = useNavigation()

  useEffect(() => {
    const timer = null;
    if (active) {
      timer = setTimeout(() => {
        onSelect();
      }, 500);
      return () => clearTimeout(timer);
    } else {
      timer = setTimeout(() => {
        onCancel();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [active, cancel]);

  return (
    <Container
      style={{
        borderRadius: 40,
        borderColor: primary,
        elevation: 0,
        borderWidth: 2,
        width: wp("80%"),
        maxWidth: 300,
        maxHeight: 430
      }}
    >
      <Content
        style={{
          padding: 20
        }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Thumbnail source={guy} large />
        <Text
          style={{
            color: primary,
            fontFamily: "Lato-Bold",
            fontSize: 22,
            marginTop: 10
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            color: primary,
            fontFamily: "Lato-Light",
            fontSize: 16,
            marginTop: 45
          }}
        >
          {desc}
        </Text>
      </Content>
      <View style={{ height: 2, backgroundColor: borderColor }} />
      <Footer
        style={{
          borderRadius: 40,
          elevation: 0,
          margin: 10,
          backgroundColor: primaryText,
          borderColor: primaryText,
          shadowColor: primaryText
        }}
      >
        <FooterTab
          style={{
            borderRadius: 40,
            elevation: 0,
            backgroundColor: primaryText,
            borderColor: primaryText,
            shadowColor: primaryText
          }}
        >
          <Button
            onPress={() => {
              setCancel(true);
            }}
          >
            <Icon
              type="AntDesign"
              name="close"
              style={{ color: cancel ? primary : borderColor, fontSize: 36 }}
            />
          </Button>
          <Button
            onPress={() => {
              setActive(true);
            }}
          >
            <Icon
              type="AntDesign"
              name="check"
              style={{ color: active ? primary : borderColor, fontSize: 36 }}
            />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};
