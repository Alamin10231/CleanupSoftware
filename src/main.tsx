import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { TooltipProvider } from "./Components/ui/tooltip";
import { router } from "./Router";
import { Toaster } from "sonner";
createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <TooltipProvider>
         <Toaster position="top-right" className="z-[99]" />
        <RouterProvider router={router} />
      </TooltipProvider>
    </Provider>
);
