const Notification = (props) => {
  const {message, messageType} = props;

  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    border: "solid black",
    borderRadius: "5px",
    padding: "10px"
  }

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    border: "solid red",
    borderRadius: "5px",
    padding: "10px"
  }

  if (message === null) return null;
  if (messageType === "notification") {
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
  
}

export default Notification;