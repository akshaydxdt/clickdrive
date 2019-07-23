import React, { useState, useEffect } from "react";
import {
  Content,
  Text,
  List,
  ListItem,
  Spinner,
  DeckSwiper,
  View
} from "native-base";
import firebase from "react-native-firebase";
import { useGlobal } from "../../../GlobalHooks";
import { useNavigation } from "react-navigation-hooks";
import Base from "../../Base";
import Card from "./Card";
import { primary } from "../../../Res/Colors";

export default () => {
  //const [instList, setInstList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState(0);
  const [state, actions] = useGlobal();
  const { navigate } = useNavigation();
  const instList = state.instList;

  const db = firebase.database();

  if (!instList) {
    actions.fetchInstructors(db);
  }

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
  //     setInstList(instList);

  //     setLoading(false);
  //   });
  // }, []);

  const getData = async () => {
    var snap = await db.on("value", snapShot => {
      return snapShot.val();
    });
    console.log("inst", snap);
    var inst = [];
    snap.forEach(item => {
      var data = item.val();
      data["key"] = item.key;
      inst.push(data);
    });
    console.log("inst", inst);

    setInstructors(inst);
  };

  const onSelect = inst => {
    actions.setInstDetails(inst);
    navigate("SelectSuccess");
  };
  const onCancel = () => {
    setActiveKey(key => {
      var newKey = key + 1;
      console.log("key", newKey);

      if (newKey > instList.length - 1) {
        return 0;
      } else {
        return newKey;
      }
    });
  };
  const item = instList[activeKey];

  return (
    <Base footer={false}>
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center " }}
      >
        {/* {loading ? (
          <Spinner color={primary} />
        ) : (
          <DeckSwiper
            dataSource={instList}
            renderItem={item => (
              <Card
                name={item.firstName + " " + item.lastName}
                onSelect={() => {
                  onSelect(item);
                }}
              />
            )}
          />
        )} */}
        {instList.length < 1 ? (
          <Spinner color={primary} />
        ) : (
          <Card
            data={item}
            name={item.firstName + " " + item.lastName}
            desc={item.description}
            onCancel={onCancel}
            onSelect={() => {
              onSelect(item);
            }}
          />
        )}
      </View>
    </Base>
  );
  // return (
  //   <Content>
  //     <List>
  //       {instList.map(item => (
  //         <ListItem
  //           key={item.mobile}
  //           onPress={() => {
  //             onSelect(item);
  //           }}
  //         >
  //           <Text>{item.firstName}</Text>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Content>
  // );
};
