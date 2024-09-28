'use client'

import ChatsPage from "./ChatsPage";
import { useState } from "react";
import { useSelector } from 'react-redux';

export function Messaging() {
  const usermydata = useSelector((store) => store.userdata);

  // console.log(data);


  return <ChatsPage user={usermydata} />;
  
}