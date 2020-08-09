
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk';
import authReducer from './auth-reducer';
import categoryReducer from './category-reducer';
import { routerMiddleware, push } from 'react-router-redux'
import reviewReducer from './review-reducer';
import starReducer from './star-reducer';
import payReducer from './pay-reducer';
import ratingReducer from './rating-reducer';

const reducers = combineReducers({
  form: formReducer,
  auth:authReducer,
  category:categoryReducer,
  review:reviewReducer,
  stars:starReducer,
  pay:payReducer,
  rating:ratingReducer
});
 const store = createStore(reducers,applyMiddleware(thunkMiddleware));
window.store=store
 export default store;