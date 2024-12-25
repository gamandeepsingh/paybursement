import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
      <RouterProvider router={router}>
          {/* Component render here */}
      </RouterProvider>
  </Provider>
);
