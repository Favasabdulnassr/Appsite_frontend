import {combineReducers,configureStore} from '@reduxjs/toolkit'
import loginReducer from './loginReducer'
import {persistStore,persistReducer} from 'redux-persist'

import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key:'root',
    storage,storage,
    whitelist:['login'],
}


const roodReducer = combineReducers({
    login :loginReducer,
})


const persistedReducer = persistReducer(persistConfig,roodReducer)
const store = configureStore({
    reducer:persistedReducer,
})

export const persistor = persistStore(store)
export default store