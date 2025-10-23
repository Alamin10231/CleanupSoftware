import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router/Router";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { TooltipProvider } from "./Components/ui/tooltip";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <TooltipProvider>
        <Router />
      </TooltipProvider>
    </Provider>
  </BrowserRouter>
);
