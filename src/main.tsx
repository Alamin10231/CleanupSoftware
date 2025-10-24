import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { TooltipProvider } from "./Components/ui/tooltip";
import { router } from "./Router";
createRoot(document.getElementById("root")!).render(
//   <BrowserRouter>
    <Provider store={store}>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </Provider>
//   </BrowserRouter>
);
