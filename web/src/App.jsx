import { useState } from "react";
import SignIn from "./components/SignIn.jsx";

function App() {
  const [signedIn, setSignedIn] = useState(false);

  if (!signedIn) {
    return <SignIn onSignedIn={() => setSignedIn(true)} />;
  }

  return (
    <main>
      <h1>Meditrack Inventory</h1>
      <p>Signed in successfully. The live dashboard arrives in our next lesson</p>
    </main>
  );
}

export default App;