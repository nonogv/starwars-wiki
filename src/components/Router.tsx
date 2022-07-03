import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchResults from './SearchResults';
import Layout from './Layout';
import CharacterDetails from './CharacterDetails';
import PlanetDetails from './PlanetDetails';
import StarshipDetails from './StarshipDetails';

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SearchResults />} />
        <Route path="people/:characterId" element={<CharacterDetails />} />
        <Route path="planets/:planetId" element={<PlanetDetails />} />
        <Route path="starships/:starshipId" element={<StarshipDetails />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
