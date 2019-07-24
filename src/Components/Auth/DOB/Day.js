import React, { useState, useEffect } from "react";
import { View, Text, Button, Content } from "native-base";
import { primary, primaryText, placeholderLight } from "../../../Res/Colors";

//generate days from 1 to 31
const getArray = () => {
  return [...Array(31).keys()];
};

export default ({ setDay, setActive }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (value) {
      setDay(value);
    }
  }, [value]);

  //Individual component for days
  const Square = ({ item, setValue, active }) => {
    var value = item + 1;
    const onSelect = () => {
      setValue(value);
      setActive(true);
    };
    return (
      <Button transparent light onPress={onSelect}>
        <Text
          style={{
            color: active === value ? primaryText : placeholderLight,
            fontSize: 15
          }}
        >
          {value}
        </Text>
      </Button>
    );
  };

  const days = getArray();

  // this function generates each row for the grid
  const renderRow = (slicedArray, id) => {
    const items = slicedArray.map(item => (
      <Square
        key={item}
        active={value}
        item={item}
        setValue={val => setValue(val)}
      />
    ));
    return (
      <View
        style={{
          marginTop: 7,
          marginBottom: 7,
          flexDirection: "row",
          justifyContent: id == 4 ? "flex-start" : "space-around"
        }}
        key={id}
      >
        {items}
      </View>
    );
  };

  //generates the grid
  const renderGrid = () => {
    const rows = [];
    while (days.length) {
      //slices the row with 7 days in each
      rows.push(renderRow(days.splice(0, 7), rows.length));
    }
    return rows;
  };

  //render main grid
  return (
    <Content
      contentContainerStyle={{
        backgroundColor: primary,
        flex: 1,
        paddingTop: 28
      }}
    >
      {renderGrid()}
    </Content>
  );
};
