import { BaseApiUrl } from '@/utils/constants';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function EventPerticular() {

  const dataquesiton = useSelector((store) => store.eventid);
  console.log(dataquesiton);
  const [data, setdata] = useState()

  const fetchEvent = async()=>{
    const response = await fetch(`${BaseApiUrl}/event/id`, {
      method: 'GET',
      headers: {
        'eventid': dataquesiton
      },
    })
    const json = await response.json()

    if (json) {
      console.log(json);
      setdata(json.data)
      
    }
  }

  useEffect(() => {
    fetchEvent()
  }, [])
  



  return (
    <>
    
    <div>{dataquesiton}</div>
    <div>{data?.eventname}</div>
    </>
    
  )
}
