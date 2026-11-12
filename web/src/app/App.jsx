import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase.js";
import SignIn from "../components/SignIn.jsx";
import Inventory from "../features/inventory/Inventory.jsx";

function App() {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading Meditrack...</p>;
  }

  if (!user) {
    return <SignIn />
  }

  return (
    <main>
      <h1>Meditrack Inventory</h1>
      { <Inventory user={ user } />  /* live dashboard */}
      <button onClick={() => signOut(auth)}>Sign out</button>
      <p>Signed in as {user.email}. </p>
    </main>
  );
}

export default App;