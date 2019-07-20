import { useEffect } from "react";

export const instructorState = {
  instDetails: null,
  linkId: null,
  instList: []
};

export const instructorActions = {
  setInstDetails: (store, instDetails) => {
    store.setState({ instDetails });
  },
  addStudentMode: store => {
    store.setState({ mode: "addStudent" });
  },
  addStudentUser: (store, user) => {
    store.setState({ user });
  },
  setLinkID: (store, linkId) => {
    store.setState({ linkId });
  },
  fetchInstructors: (store, ref) => {
    useEffect(() => {
      console.log("reacheds");
      ref.on("value", dataSnap => {
        var instList = [];
        dataSnap.forEach(item => {
          var data = item.val();
          data["key"] = item.key;
          instList.push(data);
        });
        console.log("inst", instList);
        store.setState({ instList });
      });
    }, []);
  }
};
