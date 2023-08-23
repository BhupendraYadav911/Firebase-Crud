"use client"
"use client"
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../../../firebase/firebase";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useAuth } from "../../../../firebase/auth";
import Link from "next/link";

const Provider = new GoogleAuthProvider();

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { authUser } = useAuth();

    const signupHandler = async () => {
        if (!email || !password || !username) return;
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await updateProfile(auth.currentUser, {
                displayName: username,
            });
        } catch (error) {
            console.error("An error occurred", error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, Provider);
        } catch (error) {
            console.error("An error occurred while signing in with Google:", error);
        }
    };

    return (
        <main className="flex lg:h-screen">
            <div className="d-flex w-100">
                <div className="w-50 p-4 md:p-14">
                    <h1 className="text-6xl font-semibold text-center">Sign Up</h1>
                    <p className="mt-3 text-center">
                        Already have an account?{" "}
                        <Link href="/pages/Login" className="text-decoration-none">
                            Login
                        </Link>
                    </p>

                    <div className="bg-dark text-white w-full py-2 mt-4  d-flex justify-content-center align-items-center gap-2 cursor-pointer">
                        <FcGoogle size={22} />
                        <span
                            className="font-medium text-white"
                            onClick={signInWithGoogle}
                        >
                            Login with Google
                        </span>
                    </div>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mt-4">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            className="btn btn-dark w-100 mt-4"
                            onClick={signupHandler}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
                <div
    className="w-50 bg-secondary bg-cover bg-center-top"
    style={{
        backgroundImage: "url('/login-banner.jpg')", // Replace with your image path
        backgroundSize: "100%", // Set the background size to cover the container
        height: "100vh",
    }}
></div>

            </div>
        </main>
    );
};

export default RegisterForm;

