import React, { useEffect } from "react";
import useGlobalHook from "use-global-hook";

import { authState, authActions } from "./Auth";
import { authInstructorActions, authInstructorState } from "./AuthInstructor";
import { instructorActions, instructorState } from "./instructor";
import { authDetailsState, authDetailsActions } from "./AuthDetails";

const initialState = {
  ...authState,
  ...authInstructorState,
  ...instructorState,
  ...authDetailsState,
  mode: "user"
};

const actions = {
  ...authActions,
  ...authInstructorActions,
  ...instructorActions,
  ...authDetailsActions
};

export const useGlobal = useGlobalHook(React, initialState, actions);
