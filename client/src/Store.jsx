import {applyMiddleware,compose,createStore} from "redux"
import {thunk} from "redux-thunk"
import reducers from "./reducers"
const Store = createStore(reducers,compose(applyMiddleware(thunk)))

export default Store;