import React from "react";
import { Container } from "reactstrap";
import PokedexView from "./PokedexView";
import Logo from "./LogoComponent";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PokemonDetailView from "./PokemonDetailView";
import "../css/Main.css";

export default function Main() {
  return (
    <Container className="my-5 main-container pb-4">
      <Router>
        <Routes>
          <Route
            strict
            exact
            path="/pokemons/:id/"
            element={<PokemonDetailView />}
          />
          <Route
            exact
            path="/pokemons/"
            element={
              <>
                <Logo></Logo>
                <PokedexView />
              </>
            }
          />
          <Route path="*" element={<Navigate to={`/pokemons/`} replace />} />
        </Routes>
      </Router>
    </Container>
  );
}
