import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/contactForm';
import { Filter } from './Filter/filter';
import { ContactList } from './ContactList/contactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    const { contacts } = this.state;
    const newContact = { id: nanoid(), ...data };

    contacts.some(({ name }) => name === data.name)
      ? alert(`${data.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
        }));
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  onChangeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  onDeleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>

        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2>Contacts</h2>

        {this.state.contacts.length > 0 ? (
          <Filter value={filter} onChangeFilter={this.onChangeFilter} />
        ) : (
          <h2>Your phonebook is empty</h2>
        )}

        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}