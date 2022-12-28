const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.query} onChange={props.handleInputFilter}/>
    </div>
  );
};

export default Filter;