import React, { useState } from "react";

import { useGlobal } from "../../../GlobalHooks";
import { Container, Content, Grid } from "native-base";
import { primary } from "../../../Res/Colors";
import Place from "./Place";
import FirstName from "./FirstName";
import LastName from "./LastName";

export default () => {
  const [mode, setMode] = useState("first");
  const [state, actions] = useGlobal();

  const mainRender = () => {
    switch (mode) {
      case "first":
        return <FirstName actions={actions} setMode={setMode} state={state} />;
      case "last":
        return <LastName actions={actions} setMode={setMode} state={state} />;
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
