import React from 'react'
import LocalTime from '../components/LocalTime';
import GlobalTime from '../components/GlobalTime';

export default function Home() {
  let title=`date and time task`;
  return (
    <>
      <header className=" bg-teal-500 text-white p-4">
        <h3 className="text-xl font-bold">{title}</h3>
      </header>
      <div className="p-4 space-y-4">
        <LocalTime />
        <GlobalTime />
      </div>
    </>
  )
}
