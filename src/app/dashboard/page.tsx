/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from "react";

export default function Dashboard() {

  useEffect(() => {
    console.log('init dashboard');
  }, []);

  return null;
}
