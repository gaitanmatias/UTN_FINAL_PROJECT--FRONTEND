import React from 'react'
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

export default function AuthLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
