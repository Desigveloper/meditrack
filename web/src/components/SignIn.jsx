/* eslint-disable no-unused-vars */
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";

function SignIn({onSignedIn}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);

        try {
            const credentials = await signInWithEmailAndPassword(auth, email, password);
        } catch (signInError) {
            setError("Sign-in failed. Please check your email and password");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign in to Meditrack</h1>
            {error && <p>{error}</p>}
            <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Sign in</button>
        </form>
    );
}

export default SignIn;