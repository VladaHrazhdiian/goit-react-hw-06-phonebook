import { useReducer, useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Container from '@mui/material/Container';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import { Title, ListTitle } from './App.styled';




const KEY = 'phonebook-contacts';
const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const initContactList = () => {
  const contacts = window.localStorage.getItem(KEY);
  if (contacts) {
    return JSON.parse(contacts);
  }
  return defaultContacts;
};

const actionContact = (contacts, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return [...contacts, action.contact];
    case 'DELETE_CONTACT':
      return contacts.filter(contact => contact.id !== action.id);
    default:
      return contacts;
  }
};

const App = () => {
    const [contacts, dispatch] = useReducer(
    actionContact,
    {
      contacts: [],
    },
    initContactList
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(KEY, JSON.stringify(contacts));
  }, [contacts]);


  const handleAddContact = contact => {
    const { name } = contact;

    if (contacts.some(contact => contact.name === name)) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }

   
    dispatch({ type: 'ADD_CONTACT', contact });
    Notify.success(`Add contact ${name}`);
  };


  const handleDeleteContact = id => {
    dispatch({ type: 'DELETE_CONTACT', id });
    Notify.info(`Delete contact ${id}`);
  };


  const contactFilter = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  return (
    <Container className="container" maxWidth="sm" sx={{ mt: 2 }}>
      <Title>Phonebook</Title>
      <ContactForm onAddContact={handleAddContact} />
      <ListTitle>Contacts</ListTitle>
      <Filter onFilter={e => setFilter(e.target.value)} filter={filter} />
      <ContactList
        contacts={contactFilter(contacts)}
        onDeleteContact={handleDeleteContact}
      />
    </Container>
  );
};

export default App;