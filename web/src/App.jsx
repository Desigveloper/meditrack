import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase.js";
import SignIn from "./components/SignIn.jsx";

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
      <p>Signed in as {user.email}. The live dashboard arrives in our next lesson</p>
      <button onClick={() => signOut(auth)}>Sign out</button>
    </main>
  );
}

export default App;