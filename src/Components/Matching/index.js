import React from "react";
import Base from "../Base";
import InnerContent from "./InnerContent";
import { primaryText, primary } from "../../Res/Colors";
import { View, Text } from "native-base";
import { Button } from "native-base";

export default () => {
  return (
    <Base footer={false}>
      <InnerContent />
    </Base>
  );
};
