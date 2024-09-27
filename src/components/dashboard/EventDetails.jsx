'use client'
import { useParams,  } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';

export function EventDetails() {

  const params = useParams()
  console.log(params.id);
  const dataquesiton = useSelector((store) => store.eventid);
  console.log(dataquesiton);
  
  

  return (



    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Event Details</h1>
      <p>Hello World! This is the Event Details page.</p>
    </div>
  )
}