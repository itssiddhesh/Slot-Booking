import "./App.css";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { CalendarComponent} from '@syncfusion/ej2-react-calendars';
import { gapi } from 'gapi-script';

function App() {
  var CLIENT_ID ="217599394783-d73mdf1ttibaqcpbc9dvkkh0d7if68cr.apps.googleusercontent.com";
  var API_KEY = "AIzaSyBI0lXwGMxTBk0-bHRvqHFao3oOxLOgLkQ";
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const [value, onchange] = useState('');
  const [select, setSelect] = useState("Training Room");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [selectTime, setSelectTime] = useState('');
  const [dateTime, setdateTime] = useState('');

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
  ];

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };


  const handleClick = () => {
    if(!dateTime || !value.value || des==='' || name===''|| selectTime==='' || !value){
      alert('Give all the credentials!!');
    }else{
      gapi.load('client:auth2',()=>{
        console.log('loaded client');

        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })

        gapi.client.load('calendar','v3',()=>console.log('cool'))

        gapi.auth2.getAuthInstance().signIn().then(()=>{
          var event = {
            'summary': `Training Room Affle(${name})`,
            'location': 'Affle (India) Limited,Gurgaon,Delhi',
            'description': `${des}`,
            'start': {
              'dateTime': `${dateTime}`,
              'timeZone': 'Asia/Kolkata'
            },
            'end': {
              'dateTime': `${dateTime}`,
              'timeZone': 'Asia/Kolkata'
            },
            'recurrence': [
              'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
              {'email': 'lpage@example.com'},
              {'email': 'sbrin@example.com'}
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
          }

          var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event,
          })

          request.execute(event=>{
            window.open(event.htmlLink)
          })
          
        })

      })
    }
  }

  const handleSelectTime = (e) => {
    e.target.variant = "contained";
    setSelectTime(e.target.textContent);
  };

  useEffect(()=>{
    if(value.value){
      setdateTime(value.value.toISOString());
    }
  },[value])

  return (
    <div className="App">
      <nav className="navbar">
        <button>Logout</button>
      </nav>
      <div className="main">
        <h2>Meeting Room Booking</h2>
        <fieldset style={{margin: '4px'}}>
          <legend>Meeting Room</legend>
          <select value={select} onChange={handleSelect} required>
            <option>Training Room</option>
          </select>
        </fieldset>
        <fieldset style={{margin: '4px'}}>
          <legend>Name</legend>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter Your Name"
            required
          />
        </fieldset>
        <fieldset style={{margin: '4px'}}>
          <legend>Meeting Description</legend>
          <input
            type="text"
            value={des}
            onChange={(e) => {
              setDes(e.target.value);
            }}
            placeholder="Enter meeting description"
            required
          />
        </fieldset>
        <div style={{marginTop: '10px'}}>
        <CalendarComponent value={value} onChange={onchange} />
        </div>
        <h5>{value.value && value.value.toDateString()}</h5>
        <h3>Please select your preferred slot</h3>
        <div className='booking-time'>
          {times.map((time, i) => (
            <button
              key={i}
              id={`time${i}`}
              className='timeslot'
              onClick={handleSelectTime}
            >
              {time.time}
            </button>
          ))}
        </div>
        <div>
        <button
              id='time18'
              className='timeslot'
              onClick={handleSelectTime}
            >
              7:00 PM
            </button>
        </div>
        <button className='book-btn' onClick={handleClick}>BOOK APPOINTMENT</button>
      </div>
    </div>
  );
}

export default App;
