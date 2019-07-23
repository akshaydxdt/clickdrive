import React from "react";
import { Container, Content } from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { primary } from "../../Res/Colors";

export default ({ children }) => {
  return (
    <Container style={{ backgroundColor: primary }}>
      <Content
        contentContainerStyle={{
          flex: 1
        }}
        style={{ padding: wp("8.8%") }}
      >
        {children}
      </Content>
    </Container>
  );
};
