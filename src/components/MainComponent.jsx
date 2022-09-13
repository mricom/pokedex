import React from "react";
import { Container } from "reactstrap";
import ListView from "./PokedexView";
import "../css/Main.css";
import Logo from "./LogoComponent";

export default function Main() {
  return (
    <Container className="my-5 main-container">
      <Logo></Logo>
      <ListView></ListView>
    </Container>
  );
}
