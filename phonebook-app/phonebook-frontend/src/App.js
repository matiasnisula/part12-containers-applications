import { useState, useEffect } from "react";
import personService from "./services/personService.js";
import PersonForm from "./components/PersonForm.js";
import { Persons } from "./components/Persons.js";
import Filter from "./components/Filter.js";
import Notification from "./components/Notification.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("notification");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const personAlreadyExists = persons.find((person) => {
      return person.name === newName;
    });

    if (personAlreadyExists !== undefined) {
      let replaceNumber =
        window.confirm(`${newName} is already added to phonebook,
      do you want to replace the old number with a new one?`);

      if (replaceNumber) {
        const changedPerson = { ...personAlreadyExists, number: newNumber };
        personService
          .update(changedPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) => {
                return person.id !== changedPerson.id ? person : returnedPerson;
              })
            );
            setNewName("");
            setNewNumber("");
            setNotification(
              `Persons ${changedPerson.name} number changed to ${changedPerson.number}`
            );
            setNotificationType("notification");
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setNotification(
              `Person ${changedPerson.name} doesnt exists or phonenumber is in incorrect format`
            );
            setNotificationType("error");
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          });
      }
      return;
    }

    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setNotification(`Added ${returnedPerson.name}`);
        setNotificationType("notification");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch((error) => {
        setNotificationType("error");
        setNotification(error.response.data.error);
        setTimeout(() => {
          setNotification(null);
        }, 8000);
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => {
      return person.id === id;
    });

    personService
      .deletePerson(id)
      .then((responseData) => {
        setPersons(
          persons.filter((person) => {
            return person.id !== id;
          })
        );
        setNotification(`Person ${personToDelete.name} deleted`);
        setNotificationType("notification");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch((error) => {
        setNotification(
          `Person ${personToDelete.name} was already removed from server`
        );
        setNotificationType("error");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  };

  const filterPersons = () => {
    return persons.filter((person) => {
      return person.name.toLowerCase().includes(newFilter.toLowerCase());
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} messageType={notificationType} />
      <br></br>
      <Filter query={newFilter} handleInputFilter={handleFilterChange} />
      <h3>Add a new person </h3>
      <PersonForm
        action={addPerson}
        name={newName.slice()}
        handleInputName={handleNameChange}
        number={newNumber.slice()}
        handleInputNumber={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={newFilter.length === 0 ? persons.concat() : filterPersons()}
        handleDelete={deletePerson}
      />
    </div>
  );
};

export default App;
