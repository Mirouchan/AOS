import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <SplashScreen onComplete={() => setLoading(false)} />
      ) : (
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;