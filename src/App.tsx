import { DeskproAppProvider } from "@deskpro/app-sdk";
import { Routes, HashRouter, Route } from "react-router-dom";

import "flatpickr/dist/themes/light.css";
import "tippy.js/dist/tippy.css";
import "simplebar/dist/simplebar.min.css";

import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";

import { Contacts } from "./pages/Contact";
import { Main } from "./pages/Main";

import { DealDetails } from "./pages/DealDetails";
import { Redirect } from "./pages/Redirect";
import { CreateDeal } from "./pages/CreateDeal";

function App() {
  return (
    <DeskproAppProvider>
      <HashRouter>
        <Routes>
          <Route index path="/" element={<Main />}></Route>
          <Route path="/dealdetails/:dealId" element={<DealDetails />}></Route>
          <Route path="/contacts" element={<Contacts />}></Route>
          <Route path="/redirect/" element={<Redirect />}></Route>
          <Route path="/createdeal" element={<CreateDeal />}></Route>
        </Routes>
      </HashRouter>
    </DeskproAppProvider>
  );
}

export default App;
