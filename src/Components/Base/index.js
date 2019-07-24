import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Title,
  Left,
  Right,
  View,
  Thumbnail
} from "native-base";
import { Image } from "react-native";
import avatar from "../../Res/userW.png";
import { primary, primaryText } from "../../Res/Colors";
import { useNavigation } from "react-navigation-hooks";
import textLogo from "../../Res/textLogo.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

//this is a Base Layout used for lot of other components

export default ({ children, footer }) => {
  const { navigate } = useNavigation();

  return (
    <Container style={{ backgroundColor: primary }}>
      <Header
        noShadow
        style={{
          backgroundColor: primary,
          height: hp("10.9%"),
          paddingLeft: 33,
          paddingRight: 12
        }}
        androidStatusBarColor={primary}
      >
        <Left>
          <Image
            source={textLogo}
            style={{ width: 130, height: 35, resizeMode: "contain" }}
          />
        </Left>
        <Right>
          <Thumbnail
            style={{ alignSelf: "center", height: 30, width: 30 }}
            large
            circular
            source={avatar}
          />
        </Right>
      </Header>
      <Content
        contentContainerStyle={{
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: primaryText,
          flex: 1,
          paddingRight: wp("6.6%"),
          paddingLeft: wp("6.6%"),
          paddingTop: wp("6.6%")
        }}
      >
        {children}
      </Content>
      {footer ? (
        <Footer>
          <FooterTab style={{ backgroundColor: primaryText }}>
            <Button
              onPress={() => {
                navigate("Home");
              }}
            >
              <Icon name="home" style={{ color: primary, fontSize: 32 }} />
            </Button>
            <Button
              onPress={() => {
                navigate("Matching");
              }}
            >
              <Icon
                type="FontAwesome"
                name="plus-square-o"
                style={{ color: primary, fontSize: 32 }}
              />
            </Button>
            <Button>
              <Icon name="person" style={{ color: primary, fontSize: 32 }} />
            </Button>
          </FooterTab>
        </Footer>
      ) : null}
    </Container>
  );
};
