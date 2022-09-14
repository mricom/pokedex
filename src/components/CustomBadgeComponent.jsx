import React from "react";
import { Badge } from "reactstrap";
import "../css/CustomBadge.css";

export default function CustomBadge(props) {
  return <Badge className={props.type}>{props.type}</Badge>;
}
