import React, { Component } from "react";
import ContactsList from "./components/ContactsList";
import initialContacts from "./contacts.json";
import Form from "./components/Form/Form";
import Filter from "./components/Filter/Filter";
import shortid from "shortid";

class App extends Component {
  state = {
    contacts: initialContacts,
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contact) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    if (this.state.contacts.find((contact) => contact.name === name)) {
      alert(`${name} already exist`);
      return;
    }
    const contact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;

    const filteredContacts = this.getFilteredContacts();

    return (
      <div className="container">
        <h1 className="title">Phonebook</h1>
        <Form onSubmit={this.addContact} />

        <h2 className="title">Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactsList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
