import React, { useEffect, useState } from 'react'

export default function LocalTime() {

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }

  const [localTime, setLocalTime] = useState(new Date().toLocaleString("en-US",options));


  useEffect(() => {
    setInterval(() => {
      setLocalTime(new Date().toLocaleString('en-US', options));
    },1000);
  })

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h1 className="text-lg font-semibold mb-2">Local Time Zone</h1>
      <div className="text-gray-700">{localTime}</div>
    </div>
  )
}
