import React, { useState, useEffect } from "react";
import { View, Text, Button, Content } from "native-base";
import { primary, primaryText, placeholderLight } from "../Utils/Colors";

//generate month names
const getArray = () => {
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
};

export default ({ setMonth, setActive }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (value) {
      setMonth(value);
    }
  }, [value]);

  //Individual component for days
  const Square = ({ item, setValue, active }) => {
    var value = item;
    const onSelect = () => {
      setValue(value);
      setActive(true);
    };
    return (
      <Button transparent light onPress={onSelect}>
        <Text
          uppercase={false}
          style={{
            color: active === value ? primaryText : placeholderLight,
            fontSize: 18
          }}
        >
          {value}
        </Text>
      </Button>
    );
  };

  const months = getArray();

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
          justifyContent: "space-around"
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
    while (months.length) {
      //slices the row with 3 Months in each
      rows.push(renderRow(months.splice(0, 3), rows.length));
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
