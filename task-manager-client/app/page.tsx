"use client";

import { useUserContext } from "../context/userContext.js";

export default function Home() {
  const user = useUserContext();
  console.log(user);
  return <main></main>;
}
