// reducer

const initialState = {
  AGENT_DD_IDENT: undefined
};


const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_AGENT': {
      return { ...state, AGENT_DD_IDENT: action.payload.newAgentIdent };
    }
    default:
      return state;
  }
};

export default postReducer;
