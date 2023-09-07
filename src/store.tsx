import {configureStore} from '@reduxjs/toolkit';
import { contactsApi } from './services/contactsApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
    reducer:{
        [contactsApi.reducerPath]: contactsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(contactsApi.middleware),
});

setupListeners(store.dispatch);