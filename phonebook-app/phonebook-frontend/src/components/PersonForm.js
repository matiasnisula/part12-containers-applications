const PersonForm = (props) => {
  return (
    <form onSubmit={props.action}>
      <div>
        name: <input value={props.name} onChange={props.handleInputName}/>
      </div>
      <div>
        number: <input value={props.number} onChange={props.handleInputNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;