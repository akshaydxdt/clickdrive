import React, { useState } from "react";
import { Content, Container, Grid, Toast } from "native-base";
import EmailInput from "./EmailInput";
import { primary } from "../../../Res/Colors";
import EmailCodeInput from "./EmailCodeInput";
import { useNavigation } from "react-navigation-hooks";
import { useGlobal } from "../../../GlobalHooks";
import CommonLayout from "../../CommonLayout";

export default () => {
  const { navigate } = useNavigation();
  const [state, actions] = useGlobal();
  const [mode, setMode] = useState("input");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [serverOTP, setServerOTP] = useState(null);

  const confirmCode = () => {
    // if (code == serverOTP) {
    //   actions.setEmail(email);
    //   navigate("DOB");
    // } else {
    //   Toast.show({
    //     text: "Invalid Code",
    //     duration: 2000
    //   });
    // }
    //temporary static code comparison
    if (code == "9081") {
      actions.setEmail(email);
      navigate("Pass");
    } else {
      Toast.show({
        text: "Invalid Code",
        duration: 2000
      });
    }
  };
  mainRender = () => {
    switch (mode) {
      case "input":
        return (
          <EmailInput
            email={email}
            setEmail={setEmail}
            setMode={setMode}
            setServerOTP={setServerOTP}
          />
        );
      case "codeInput":
        return (
          <EmailCodeInput
            email={email}
            code={code}
            setCode={setCode}
            confirmCode={confirmCode}
            setMode={setMode}
            setServerOTP={setServerOTP}
          />
        );
    }
  };
  return <CommonLayout>{mainRender()}</CommonLayout>;
};
