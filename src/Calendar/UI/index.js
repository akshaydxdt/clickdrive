import React, { useEffect } from "react";
import { Container, Content, Grid } from "native-base";
import Picker from "./Picker";
import { primary } from "../Utils/Colors";

export default () => {
  return (
    <Container style={{ backgroundColor: primary }}>
      <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 15 }}>
        <Grid style={{ alignItems: "center" }}>
          <Picker />
        </Grid>
      </Content>
    </Container>
  );
};
