import React, { useEffect, useState } from "react";
import { Text, Icon, Button, Content, Container, Grid, Row } from "native-base";
import { View, Image } from "react-native";
import successImageUri from "../../Res/success.png";
import { primary, primaryText } from "../../Res/Colors";
import { useNavigation } from "react-navigation-hooks";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import tick from "../../Res/tick.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import firebase from "react-native-firebase";
import { useGlobal } from "../../GlobalHooks";

export default () => {
  const { navigate } = useNavigation();
  const [num, setNum] = useState(0);
  const [done, setDone] = useState(false);
  const [state, actions] = useGlobal();

  // const db = firebase.database().ref("instructors");

  // useEffect(() => {
  //   console.log("reached");
  //   db.on("value", dataSnap => {
  //     var instList = [];
  //     dataSnap.forEach(item => {
  //       var data = item.val();
  //       data["key"] = item.key;
  //       instList.push(data);
  //     });
  //     console.log("inst", instList);
  //     actions.setInstList(instList);
  //   });
  // }, []);

  const renderBlock = label => {
    return (
      <View
        style={{
          flexDirection: "row",
          margin: 5
        }}
      >
        <AnimatedCircularProgress
          rotation={0}
          size={25}
          width={1}
          fill={100}
          tintColor={primaryText}
          duration={2000}
          onAnimationComplete={() => {
            setNum(num => num + 1);
            //setCount(true);
          }}
          backgroundColor={primary}
        >
          {fill => {
            if (fill == 100) {
              return (
                <Image
                  source={tick}
                  style={{ width: 15, height: 15, resizeMode: "contain" }}
                />
              );
            } else {
              return null;
            }
          }}
        </AnimatedCircularProgress>
        <Text
          style={{
            color: primaryText,
            fontSize: 13,
            alignSelf: "center",
            marginLeft: 10
          }}
        >
          {label}
        </Text>
      </View>
    );
  };

  const rednerDone = () => {
    return (
      <View
        style={{
          flexDirection: "column",
          paddingTop: 25,
          alignItems: "center"
        }}
      >
        <AnimatedCircularProgress
          rotation={0}
          size={180}
          width={3}
          fill={100}
          tintColor={primaryText}
          duration={2000}
          backgroundColor={primary}
          onAnimationComplete={() => setDone(true)}
        >
          {fill => {
            return done ? (
              <Image
                source={tick}
                style={{ width: 90, height: 90, resizeMode: "contain" }}
              />
            ) : null;
          }}
        </AnimatedCircularProgress>
        {done ? (
          <View style={{ width: 250, alignSelf: "center" }}>
            <Text
              style={{
                color: primaryText,
                fontSize: 15,
                alignSelf: "center",
                marginTop: 30,
                textAlign: "center"
              }}
            >
              Yihaaaa!!
            </Text>
            <Text
              style={{
                color: primaryText,
                fontSize: 15,
                alignSelf: "center",
                marginTop: 5,
                textAlign: "center"
              }}
            >
              Your instructor matches are waiting for you . . .
            </Text>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <Container style={{ backgroundColor: primary }}>
      <Content
        contentContainerStyle={{
          padding: 30,
          alignItems: "center",
          justifyContent: "space-evenly",
          flex: 1
        }}
      >
        <View
          style={{
            width: wp("100%"),
            paddingRight: wp("15%"),
            paddingLeft: wp("15%"),
            alignSelf: "baseline",
            flex: 1
          }}
        >
          {num >= 0 ? renderBlock("Invoking the server") : null}
          {num >= 1 ? renderBlock("Starting the neural engine") : null}
          {num >= 2 ? renderBlock("Feeding the armadillo") : null}
          {num >= 3 ? renderBlock("Finalizing the matches") : null}
        </View>

        <View style={{ flex: 2.5, paddingTop: 20 }}>
          {num >= 4 ? rednerDone() : null}
        </View>

        <View
          style={{
            flex: 0.25,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "flex-end",
            width: "100%",
            marginTop: 20
          }}
        >
          {done ? (
            <Button
              light
              bordered
              style={{
                alignSelf: "stretch",
                justifyContent: "center",
                borderRadius: 15
              }}
              onPress={() => {
                navigate("InstructorList");
              }}
            >
              <Text
                uppercase={false}
                style={{
                  color: primaryText,
                  fontSize: 18
                }}
              >
                Show my Matches
              </Text>
            </Button>
          ) : null}
        </View>

        {/* {done ? (
          <Button
            light
            bordered
            style={{
              marginTop: 40,
              alignSelf: "stretch",
              justifyContent: "center",
              borderRadius: 15
            }}
            onPress={() => {
              navigate("InstructorList");
            }}
          >
            <Text
              uppercase={false}
              style={{
                color: primaryText,
                fontSize: 20
              }}
            >
              Show my Matches
            </Text>
          </Button>
        ) : null} */}

        {/* <Image source={successImageUri} style={{ width: 100, height: 100 }} /> */}
      </Content>
    </Container>
  );
};
