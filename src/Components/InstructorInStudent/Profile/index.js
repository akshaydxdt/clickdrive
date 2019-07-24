import React, { Component } from "react";

import { useGlobal } from "../../../GlobalHooks";
import InnerContent from "./InnerContent";
import Base from "../../Base";
import { Button } from "native-base";

//================checking if it's a first lesson============

// export default () => {
//   const [state] = useGlobal();
//   const { firstName, lastName } = state.instDetails;
//   const firstLesson = false;
//   // const { firstLesson, profileLock } = state.userDetails;

//   const onBook = () => {
//     if (firstLesson) {
//     }
//   };

//   return (
//     <Container>
//       <Content>
//         <Text>
//           Name: {firstName} {lastName}
//         </Text>
//         <Button onPress={onBook}>
//           {firstLesson ? (
//             <Text>Book a session</Text>
//           ) : (
//             <Text>Book your first session for free </Text>
//           )}
//         </Button>
//       </Content>
//     </Container>
//   );
// };

export default () => {
  const [state] = useGlobal();

  return (
    <Base footer={true}>
      <InnerContent />
    </Base>
  );
};
