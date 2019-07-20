import React, { useState, useEffect, useReducer } from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";
import firebase from "react-native-firebase";
import { useNavigation, useNavigationParam } from "react-navigation-hooks";
import { useGlobal } from "../../../GlobalHooks";
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Grid,
  Col,
  Text,
  Toast,
  Root
} from "native-base";
import PhoneNumberInput from "./PhoneNumberInput";
import VerificationCodeInput from "./VerificationCodeInput";
import successImageUri from "../../../Res/success.png";
import { primary } from "../../../Res/Colors";

const initialState = {
  user: null,
  message: null,
  codeInput: "",
  phoneNumber: "",
  confirmResult: {},
  changeNumber: false,
  verificationId: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "phInput":
      return { ...state, phoneNumber: action.data };
    case "codeInput":
      return { ...state, codeInput: action.data };
    case "setMsg":
      return { ...state, message: action.data };
    case "setResult":
      return { ...state, confirmResult: action.data };
    case "setUser":
      return { ...state, user: action.data };
    default:
      throw new Error();
  }
};

export default () => {
  const auth = firebase.auth();

  const [data, setData] = useState({
    user: null,
    message: "",
    codeInput: "",
    phoneNumber: "",
    confirmResult: null,
    changeNumber: false,
    verificationId: "",
    timer: 60
  }); //remove later

  const { navigate } = useNavigation();
  const from = useNavigationParam("from");

  const [mode, setMode] = useState("input");
  const [timer, setTimer] = useState(0);
  const [active, setActive] = useState(false);

  const [statea, actions] = useGlobal();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    var t = null;
    if (timer > 0) {
      t = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(t);
    }

    return () => clearInterval(t);
  }, [timer]);

  useEffect(() => {
    auth.signOut();
  }, []);

  useEffect(() => {
    if (active) {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          console.log("auth", user);

          actions.setUser(user);
          dispatch({ type: "setMsg", data: "Code Confirmed!" });
          //navigate("Personalinfo");
          //setMode("success");
          actions.setMobile(state.phoneNumber);
          if (from === "fb") {
            navigate("DOB");
          } else {
            navigate("EmailVerification");
          }
        }
      });

      return () => unsubscribe();
    }
  }, [active]);

  const signIn = () => {
    const { phoneNumber } = state;
    console.log("ph", phoneNumber);
    dispatch({ type: "setMsg", data: "Sending code ..." });

    auth
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => {
        dispatch({ type: "setResult", data: confirmResult });
        console.log("confirm", confirmResult);

        dispatch({ type: "setMsg", data: "Code has been sent!" });
        setMode("codeInput");
        setTimer(60);
        // /countdownTimer(); //might need to be added as a callback
      })
      .catch(error =>
        dispatch({
          type: "setMsg",
          data: `Sign In With Phone Number Error: ${error.message}`
        })
      );

    // dispatch({ type: "setMsg", data: "Code has been sent!" });
    // setMode("codeInput");
    // setTimer(60);
  };

  const confirmCode = () => {
    const { codeInput, confirmResult, changeNumber } = state;

    console.log("state", state);
    // if (codeInput === "545121") {
    //   dispatch({ type: "setMsg", data: "Code Confirmed!" });

    //   setMode("success");
    // }

    // const credential = firebase.auth.PhoneAuthProvider.credential(
    //   confirmResult.verificationId,
    //   codeInput
    // );

    if (confirmResult && codeInput.length > 0) {
      if (!changeNumber) {
        //firebase.auth().signInWithCredential(credential);
        console.log("code", codeInput);
        setActive(true);
        confirmResult
          .confirm(codeInput)
          .then(user => {
            console.log("user", user);
            // actions.setUser(user);
            // dispatch({ type: "setMsg", data: "Code Confirmed!" });
            // //navigate("Personalinfo");
            // //setMode("success");
            // actions.setMobile(state.phoneNumber);
            // if (from === "fb") {
            //   navigate("DOB");
            // } else {
            //   navigate("EmailVerification");
            // }
          })
          .catch(error => {
            console.log("error", error);

            dispatch({
              type: "setMsg",
              data: `Code Confirm Error: ${error.message}`
            });
          });
      } else {
      }
    }
  };

  const signOut = () => {
    firebase.auth().signOut();
    setMode("input");
  };

  const onChangePhoneNumber = () => {
    const { user, phoneNumber } = data;

    firebase
      .auth()
      .verifyPhoneNumber(phoneNumber)
      .on(
        "state_changed",
        phoneAuthSnapshot => {
          switch (phoneAuthSnapshot.state) {
            case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
              console.log("code sent");
              setData(data => {
                data.confirmResult = true;
                data.verificationId = phoneAuthSnapshot.verificationId;
                data.user = null;
                data.message = "Code has been sent!";
                return data;
              });

              break;
            case firebase.auth.PhoneAuthState.ERROR: // or 'error'
              setData(data => {
                data.message = "Verification Error";
                return data;
              });
              console.log("verification error");
              console.log(phoneAuthSnapshot.error);
              break;
          }
        },
        error => {
          console.log(error);
          // verificationId is attached to error if required
          console.log(error.verificationId);
        },
        phoneAuthSnapshot => {
          console.log(phoneAuthSnapshot);
        }
      );
  };

  updatePhoneNumber = (verificationId, verificationCode) => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );

    // user.updatePhoneNumber(credential);
    firebase.auth().currentUser.updatePhoneNumber(credential);
  };

  // const renderMessage = () => {
  //   const { message } = state;

  //   if (message != null) {
  //     Toast.show({
  //       text: message,
  //       duration: 2000
  //     });
  //   }
  // };

  renderOnSuccess = user => {
    return (
      <View
        style={{
          padding: 15,
          justifyContent: "center",
          alignItems: "center",
          flex: 1
        }}
      >
        <Text
          style={{ fontSize: 18, color: "white", fontFamily: "Lato-Regular" }}
        >
          Phone Number Registered!
        </Text>

        <Button
          light
          bordered
          style={{
            marginTop: 35,
            alignSelf: "stretch",
            justifyContent: "center",
            borderRadius: 15
          }}
          onPress={() => {
            actions.setMobile(state.phoneNumber);
            if (from === "fb") {
              navigate("DOB");
            } else {
              navigate("EmailVerification");
            }
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Lato-Regular"
            }}
            uppercase={false}
          >
            Continue
          </Text>
        </Button>
        {/* <Button title="Sign Out" color="red" onPress={signOut} />
        <Button
          title="Change Number"
          color="blue"
          onPress={() => {
            setData(data => {
              data.changeNumber = true;
              return data;
            });
          }}
        /> */}
      </View>
    );
  };

  renderChangeNumber = () => {
    const { phoneNumber } = data;
    return (
      <View style={styles.content}>
        <Text>Enter phone number:</Text>

        <TextInput
          autoFocus
          style={{
            height: 40,
            marginTop: 15,
            marginBottom: 15,
            color: "red"
          }}
          onChangeText={value =>
            setData(data => {
              data.phoneNumber = value;
              return data;
            })
          }
          placeholder={"Phone number ... "}
          value={phoneNumber}
        />
        <View>
          <Button title="Change" color="green" onPress={onChangePhoneNumber} />
          <Button
            title="Cancel"
            color="red"
            onPress={() =>
              setData(data => {
                data.changeNumber = false;
                return data;
              })
            }
          />
        </View>
      </View>
    );
  };

  mainRender = () => {
    switch (mode) {
      case "input":
        return (
          <PhoneNumberInput
            phoneNumber={state.phoneNumber}
            dispatch={dispatch}
            signIn={signIn}
          />
        );

      case "codeInput":
        return (
          <VerificationCodeInput
            codeInput={state.codeInput}
            timer={timer}
            signIn={signIn}
            confirmCode={confirmCode}
            dispatch={dispatch}
          />
        );

      case "success":
        return renderOnSuccess();

      case "changeNum":
        return renderChangeNumber();
    }
  };

  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 15 }}>
        <Grid style={{ alignItems: "center" }}>
          {/* {renderMessage()} */}
          {mainRender()}
        </Grid>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: primary
  }
});
