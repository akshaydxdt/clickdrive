import React, { useState, useEffect } from "react";
import { View, Text, Button, Content, Thumbnail, Container } from "native-base";
import a1 from "../../Res/match/1.jpg";
import a2 from "../../Res/match/2.jpg";
import a3 from "../../Res/match/3.jpg";
import a4 from "../../Res/match/4.jpg";
import a5 from "../../Res/match/5.jpg";
import a6 from "../../Res/match/6.jpg";
import { Image } from "react-native";
import { primary, placeholderLight, primaryText } from "../../Res/Colors";
import Base from "../Base";
import {
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
import { useNavigation } from "react-navigation-hooks";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const getArray = () => {
  return [a1, a2, a3, a4, a5, a6];
};
var scale = wp("28%");
console.log("width", wp("100%"), hp("100%"));

//Math.min(wp("40%"), hp("22%"));

export default () => {
  const [values, setValue] = useState([]);
  const { navigate } = useNavigation();

  const Circle = ({ item, setValue }) => {
    const [active, setActive] = useState(false);
    var data = values;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setActive(active => !active);
          if (active) {
            data.push(item);
            setValue(data);
          }
        }}
      >
        {/* <Thumbnail
          source={item}
          large
          style={{
            borderWidth: 4,
            borderColor: active ? primary : placeholderLight
          }}
        /> */}
        <Image
          source={item}
          style={{
            width: scale,
            height: scale,
            borderRadius: scale / 2,
            borderWidth: 4,
            borderColor: active ? primary : placeholderLight
          }}
        />
      </TouchableWithoutFeedback>
    );
  };

  const years = getArray();

  const renderRow = (slicedArray, id) => {
    const items = slicedArray.map(item => (
      <Circle item={item} setValue={setValue} />
    ));
    return (
      <View
        style={{
          marginTop: 5,
          marginBottom: 5,
          flexDirection: "row",
          justifyContent: "space-around"
        }}
        key={id}
      >
        {items}
      </View>
    );
  };

  const renderGrid = () => {
    const rows = [];
    while (years.length) {
      rows.push(renderRow(years.splice(0, 2), rows.length));
    }
    return rows;
  };

  //render main grid
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        marginBottom: 50
      }}
    >
      <View>
        <Text
          style={{
            fontSize: wp("5.8%"),
            color: primary,
            fontFamily: "Lato-Bold"
          }}
        >
          Select multiple images
        </Text>
        <Text
          style={{
            fontWeight: "normal",
            fontSize: wp("5.5%"),
            color: primary,
            marginTop: 8,
            fontFamily: "Lato-Light"
          }}
        >
          that relates the best to you
        </Text>
      </View>
      {/* <Content style={{ flex: 1, marginTop: 15 }}>{renderGrid()}</Content> */}

      <View
        style={{
          marginTop: 10
        }}
      >
        {renderGrid()}
      </View>
      <View>
        <Button
          style={{
            backgroundColor: primary,

            borderRadius: 14,
            height: 35,
            alignSelf: "stretch",
            justifyContent: "center",
            marginTop: 15,
            shadowColor: null,
            elevation: 0
          }}
          onPress={() => {
            navigate("MatchSuccess");
          }}
        >
          <Text
            style={{
              color: primaryText
            }}
            uppercase={false}
          >
            Confirm
          </Text>
        </Button>
      </View>
      {/* <Content
        contentContainerStyle={{
          paddingTop: 28,
          flex: 1
        }}
      >
        {renderGrid()}
      </Content> */}
    </View>
  );
};
