import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { isEqual } from 'lodash';
import { toast } from 'react-toastify';

const initialState = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: initialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        const { id, name, number } = action.payload;
        const lowerCaseName = name.toLowerCase();

        const isNameExists = state.contacts.some(
          contact => isEqual(contact.name.toLowerCase(), lowerCaseName)
        );

        if (!isNameExists) {
          state.contacts.push({ id, name, number });
      
          toast.success('Contact added successfully');
        } else {
            toast.error('A contact with this name already exists');
        }
      },
      prepare(name, number) {
        return {
          payload: {
            id: nanoid(5),
            name,
            number,
          },
        };
      },
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, setFilter } = phonebookSlice.actions;
export const phonebookReducer = phonebookSlice.reducer;