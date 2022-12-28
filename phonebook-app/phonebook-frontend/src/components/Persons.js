const DeleteButton = (props) => {
  return (
    <button onClick={props.deleteHandler} >
      delete
    </button>
  );
};

const Person = (props) => {
  const {person} = props;
  return (
    <p>{person.name} {person.number}</p>
  );
};
  
  
const Persons = (props) => {
  const {persons, handleDelete} = props;
  
  return (
    <div>
      {persons.map((person) => {
        return (
          <div key={person.id}>
            <Person key={person.name} person={person} />
            <DeleteButton 
              deleteHandler={() => {
                if (window.confirm(`Delete ${person.name}?`)) {
                  return handleDelete(person.id)
                }
            }}
            />
          </div>
        );
        })}
    </div>
  );
};

export {Persons};