// reducer

const initialState = {
  backPage: '/menu',
  nameOfPage: 'Menu',
  activePages: {
    mesDossiers: '/mes-dossiers',
    etablissements: '/etablissements',
    preferences: '/preferences'
  }
};

const changeActiveState = (state, tab, value) => {
  switch (tab) {
    case 'mesDossiers': {
      return {
        ...state,
        activePages: { ...state.activePages, mesDossiers: value }
      };
    }
    case 'etablissements': {
      return {
        ...state,
        activePages: { ...state.activePages, etablissements: value }
      };
    }
    case 'preferences': {
      return {
        ...state,
        activePages: { ...state.activePages, preferences: value }
      };
    }
  }
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_NAME': {
      return { ...state, nameOfPage: action.payload.newName };
    }
    case 'CHANGE_BACK_URL': {
      return { ...state, backPage: action.payload.backUrl };
    }
    case 'CHANGE_ACTIVE_PAGE': {
      return changeActiveState(state, action.payload.tab, action.payload.value);
    }
    default:
      return state;
  }
};

export default postReducer;
