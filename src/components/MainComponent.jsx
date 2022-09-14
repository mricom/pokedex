import React from "react";
import { Container } from "reactstrap";
import PokedexView from "./PokedexView";
import "../css/Main.css";
import Logo from "./LogoComponent";

export default function Main() {
  return (
    <Container className="my-5 main-container pb-4">
      <Logo></Logo>
      <PokedexView></PokedexView>
    </Container>
  );
}
