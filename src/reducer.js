export const initialState = {
  user: null,
};

export const action__types = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  console.log("action", action);
  switch (action.type) {
    case action__types.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;

