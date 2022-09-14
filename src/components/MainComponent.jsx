import React from "react";
import { Container } from "reactstrap";
import PokedexView from "./PokedexView";
import Logo from "./LogoComponent";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "../css/Main.css";

export default function Main() {
  return (
    <Container className="my-5 main-container pb-4">
      <Logo></Logo>
      <Router>
        <Routes>
          <Route exact path="/pokemons/" element={<PokedexView />} />
          <Route path="*" element={<Navigate to="/pokemons/" replace />} />
        </Routes>
      </Router>
    </Container>
  );
}
