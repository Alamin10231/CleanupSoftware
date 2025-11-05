import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { TooltipProvider } from "./Components/ui/tooltip";
import { Toaster } from "sonner";
import { RouterProver } from "./router-provider";


createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <TooltipProvider>
         <Toaster position="top-right" className="z-[99]" />
        <RouterProver />
      </TooltipProvider>
    </Provider>
);
