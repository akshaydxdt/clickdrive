import React, { useState, useEffect, useReducer } from "react";
import { View, Text, Button, Content, Icon } from "native-base";
import { primary, primaryText, placeholderLight } from "../Utils/Colors";

//generate the past 18 years

const initialState = {
  years: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setYears":
      return { ...state, years: action.data };
    default:
      throw new Error();
  }
};

export default ({ setYear, setActive }) => {
  const [value, setValue] = useState(null);

  const [next, setNext] = useState(0);

  const [state, dispatch] = useReducer(reducer, initialState);

  const years = state.years;

  useEffect(() => {
    getNextArray();
  }, [next]);

  useEffect(() => {
    if (value) {
      setYear(value);
    }
  }, [value]);

  const getNextArray = () => {
    var newYears = [];

    var currentYear = new Date().getFullYear() - 18 * next;
    for (let k = 1; k < 19; k++) {
      newYears.push(currentYear - k);
    }
    dispatch({ type: "setYears", data: newYears });
  };

  //Individual component for Years
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

  const renderGrid = () => {
    const rows = [];

    if (years) {
      var temp = [...years];
      while (temp.length) {
        //slices the row with 3 years in each
        rows.push(renderRow(temp.splice(0, 3), rows.length));
      }
    }

    return rows;
  };

  //render main grid
  return (
    <Content
      style={{ flex: 1 }}
      contentContainerStyle={{
        backgroundColor: primary,
        paddingTop: 28,
        flex: 1,
        minHeight: "100%"
      }}
    >
      {renderGrid()}
      {years ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignSelf: "flex-end",
            width: "100%",
            justifyContent: "space-between"
          }}
        >
          <Icon
            onPress={() => {
              if (next > 0) {
                setNext(next => next - 1);
              }
            }}
            type="FontAwesome"
            name="angle-double-left"
            style={{ color: next > 0 ? "white" : "rgba(255, 255, 255, 0.6)" }}
          />
          <Icon
            onPress={() => {
              setNext(next => next + 1);
            }}
            type="FontAwesome"
            name="angle-double-right"
            style={{ color: "white" }}
          />
        </View>
      ) : null}
    </Content>
  );
};
