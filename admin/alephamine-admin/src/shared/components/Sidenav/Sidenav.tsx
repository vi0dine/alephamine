import React from "react";
import "./Sidenav.styles.scss";
import SidenavItem from "./components/SidenavItem/SidenavItem";
import { ImBooks, ImUsers, ImHome, ImCalculator } from "react-icons/im";

const Sidenav = () => {
  return (
    <div className={"Sidenav__container"}>
      <SidenavItem icon={<ImHome />} text={"Dashboard"} to={"/"} />
      <SidenavItem icon={<ImUsers />} text={"Użytkownicy"} to={"/users"} />
      <SidenavItem icon={<ImBooks />} text={"Książki"} to={"/books"} />
      <SidenavItem icon={<ImCalculator />} text={"Statystyki"} to={"/stats"} />
    </div>
  );
};

export default Sidenav;
