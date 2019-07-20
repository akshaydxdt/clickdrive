import React, { useState } from "react";
import Name from "./Name";
import { useGlobal } from "../../../GlobalHooks";
import { Container, Content, Grid } from "native-base";
import { primary } from "../../../Res/Colors";
import Place from "./Place";

export default () => {
  const [mode, setMode] = useState("name");
  const [state, actions] = useGlobal();

  const mainRender = () => {
    switch (mode) {
      case "name":
        return <Name actions={actions} setMode={setMode} state={state} />;
      case "place":
        return <Place actions={actions} setMode={setMode} state={state} />;
      default:
        break;
    }
  };

  return (
    <Container style={{ backgroundColor: primary }}>
      <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 15 }}>
        <Grid style={{ alignItems: "center" }}>{mainRender()}</Grid>
      </Content>
    </Container>
  );
};
