import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";

export function configureStore(initialState: any) {
  const store = createStore(
    rootReducer,
    initialState
    // composeEnhancers(applyMiddleware(...middlewares)),
  );
  return store;
}
