import { useEffect } from "react";

export const instructorState = {
  instDetails: null,
  linkId: null,
  instList: null
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
  setInstList: (store, instList) => {
    store.setState({ instList });
  },
  fetchInstructors: (store, db) => {
    useEffect(() => {
      if (store.instList == null) {
        console.log("reached");
        db.ref("instructors").on("value", dataSnap => {
          var instList = [];
          dataSnap.forEach(item => {
            var data = item.val();
            data["key"] = item.key;
            instList.push(data);
          });
          console.log("inst", instList);
          store.setState({ instList });
        });
      }
    }, [db]);
  }
};
