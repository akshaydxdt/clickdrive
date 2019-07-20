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

export default ({ children, footer }) => {
  const { navigate } = useNavigation();

  return (
    <Container style={{ backgroundColor: primary }}>
      <Header
        noShadow
        style={{
          backgroundColor: primary,
          height: 89,
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
          padding: 33
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
                navigate("InstProfile");
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
