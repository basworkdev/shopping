import {CartAct as actSelector} from "../actions/CartAct";

const defaultState = {
  listForCart: []
};

const CsCartRedu = (state = defaultState, action) => {
  let nState = { ...state };
  switch (action.type) {
      case actSelector.LOAD_DATA: {
          return {...action.payload};
      }

      default: 
        return nState;
    }
  }
  
  export default CsCartRedu;
  