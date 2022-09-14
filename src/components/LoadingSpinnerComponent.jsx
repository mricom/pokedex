import React from 'react'; 
import { Spinner } from 'reactstrap';
import "../css/LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <Spinner className="spinner" type="grow"/>
  )
}
