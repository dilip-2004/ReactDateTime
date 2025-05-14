import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GlobalTime() {

  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");
  const [timeZoneId, setTimeZoneId] = useState("");
  const [timeZones, setTimeZones] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const selectTime = (event) => {
    const selectedValue = event.target.value;
    setTimeZoneId(selectedValue);
  };

  useEffect(() => {
    const getAllTimeZones = async () => {
      try {
        const res = await axios.get(`https://datetimewebapi.runasp.net/api/Home`);
        setTimeZones(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllTimeZones();
  }, []);

  useEffect(() => {
    if (!timeZoneId) return;

    setIsLoading(true);
    setMessage("")
    const getTimeZoneById = async () => {
      try {
        const res = await axios.post(`https://datetimewebapi.runasp.net/api/Home/time`, { TimeZoneId: timeZoneId });
        setSelectedTime(res.data.time);
        setMessage(`${timeZoneId} time successfully received from the date time server`);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    const intervalId = setInterval(getTimeZoneById, 1000);

    return () => clearInterval(intervalId);
  }, [timeZoneId]);

  return (
    <div className="bg-white shadow-md rounded p-4">
      <header className="mb-4">
        <h1 className="text-lg font-semibold">All Time Zones</h1>
      </header>
      <div className="mb-4">
        <select onChange={selectTime} className="border p-2 rounded w-full">
          <option value="">Select time zone</option>
          {timeZones.map(timeZone => (
            <option key={timeZone.id} value={timeZone.id}>{timeZone.displayName}</option>
          ))}
        </select>
      </div>
      <div>
        <h2 className="text-md font-medium mb-2">Selected TimeZone</h2>
        {isLoading ? <p className="text-blue-500">Loading...</p> : <p className="text-gray-700">{selectedTime || "Time zone not selected"}</p>}
        <p className="text-green-500">{message}</p>
      </div>
    </div>
  );
}