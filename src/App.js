import "./App.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import Button from "@material-ui/core/Button";

function App() {
  const [value, onchange] = useState(new Date());
  const [select, setSelect] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [selectTime, setSelectTime] = useState([]);

  const times = [
    { time: "10:00 AM" },
    { time: "10:30 AM" },
    { time: "11:00 AM" },
    { time: "11:30 AM" },
    { time: "12:00 PM" },
    { time: "12:30 PM" },
    { time: "1:00 PM" },
    { time: "1:30 PM" },
    { time: "2:00 PM" },
    { time: "2:30 PM" },
    { time: "3:00 PM" },
    { time: "3:30 PM" },
    { time: "4:00 PM" },
    { time: "4:30 PM" },
    { time: "5:00 PM" },
    { time: "5:30 PM" },
    { time: "6:00 PM" },
    { time: "6:30 PM" },
    { time: "7:00 PM" },
  ];

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  const handleBooking=()=>{
    var room = select;
    var description = des;
    var employee = name;
    
  }

  const handleSelectType=(e)=>{
    e.target.variant='secondary'
    setSelectTime([...selectTime,e.target.id])
    console.log(e.target.id);
  }

  return (
    <div className="App">
      <nav className="navbar">Book A Meeting</nav>
      <div className="main">
        <h2>Meeting Room Booking</h2>
        <fieldset>
          <legend>Meeting Room</legend>
          <select value={select} onChange={handleSelect}>
            <option>Select Meeting Type</option>
            <option>Training Room</option>
          </select>
        </fieldset>
        <fieldset>
          <legend>Name</legend>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter Your Name"
          />
        </fieldset>
        <fieldset>
          <legend>Meeting Description</legend>
          <input
            type="text"
            value={des}
            onChange={(e) => {
              setDes(e.target.value);
            }}
            placeholder="Enter meeting description"
          />
        </fieldset>
        <Calendar onChange={onchange} value={value} />
        <h5>{value.toDateString()}</h5>
        <h3>Please select your preferred slot</h3>
        <div
          style={{
            width: "80%",
            padding: "10px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {times.map((time,i) => (
            <Button key={i} id={`time${i}`} variant="outlined" color="primary" onClick={handleSelectType}>
              {time.time}
            </Button>
          ))}
        </div>
        <Button variant="contained" color="secondary" onClick={handleBooking} >BOOK APPOINTMENT</Button>
      </div>
    </div>
  );
}

export default App;
