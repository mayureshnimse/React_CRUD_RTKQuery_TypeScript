import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { Contact } from '../models/contact.model';


export const contactsApi = createApi({
    reducerPath: "contactsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/'
    }),
    tagTypes: ['Contact'],
    endpoints: (builder) => ({

        contacts: builder.query<Contact[], void>({      // fetching all contacts
            query: () => '/contacts',
            providesTags: ['Contact'],
        }),

        contact: builder.query<Contact, string>({       // fetching single contact
            query: (id) => `/contacts/${id}`,
            providesTags: ['Contact'],
        }),

        addContact: builder.mutation<void, Contact>({   // adding a contact, returns void, 
            query: (contact) => ({                      // accept an obj of type Contact
                url: "/contacts",
                method: "POST",
                body: contact,
            }),
            invalidatesTags: ['Contact'],
        }),

        updateContact: builder.mutation<void, Contact>({    // editing a contact
            query: ({id, ...rest}) =>({
                url: `/contacts/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Contact'],
        }),

        deleteContact: builder.mutation<void, string>({     // deleting a contact
            query: (id) =>({
                url: `/contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contact'],
        }), 
        
        
    }),

});

export const {
    useContactsQuery, 
    useAddContactMutation, 
    useDeleteContactMutation, 
    useContactQuery,
    useUpdateContactMutation,
} = contactsApi;
