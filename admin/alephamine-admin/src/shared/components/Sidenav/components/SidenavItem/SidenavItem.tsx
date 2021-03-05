import React, { useEffect } from "react";
import "./SidenavItem.styles.scss";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { useLocation } from "react-router-dom";

type SidenavItemProps = {
  text: string;
  icon?: any;
  to: string;
};

const SidenavItem = ({ text, icon, to }: SidenavItemProps) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div className={"SidenavItem__container"}>
      {{ ...icon, props: { className: "SidenavItem__icon" } }}
      <span className={"SidenavItem__text"} onClick={() => dispatch(push(to))}>
        {text}
      </span>
    </div>
  );
};

export default SidenavItem;
