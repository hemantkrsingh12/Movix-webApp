import React from "react";
import "./SwitchTabs.scss";
import { useState } from "react";
const SwitchTabs = (props) => {
  const [selectedtab, setselectedtab] = useState(0);
  const [left, setleft] = useState(0);

  const activetab = (tab, index) => {
    setleft(index * 100);
    setTimeout(() => {
      setselectedtab(index);
    }, 300);
    props.ontabchange(tab, index);
  };
  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {props.data.map((tab, index) => (
          <span
            key={index}
            className={`tabItem ${selectedtab === index ? "active" : ""}`}
            onClick={() => activetab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left: left }}></span>
      </div>
    </div>
  );
};

export default SwitchTabs;
