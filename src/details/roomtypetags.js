import React from "react";
import "./roomtypetags.css";

const RoomTypeTags = (props) => {
  let data = props.data;
  return data.map((item) => {
    return (
      <span
        key={item.name}
        className="triptags bg-danger"
        style={{ margin: "2px" }}
      >
        <b>{item.name}</b>
      </span>
    );
  });
};

export default RoomTypeTags;
