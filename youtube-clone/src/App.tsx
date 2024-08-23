import "./App.css";

import { SidebarProvider } from "./Context/SlidebarContext";
import { HomePage } from "./Layouts/HomePage";

function App() {
  return (
    <SidebarProvider>
      <HomePage />
    </SidebarProvider>
  );
}

export default App;
