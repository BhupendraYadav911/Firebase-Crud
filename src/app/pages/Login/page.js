"use client"
// LoginForm.js
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../../../firebase/firebase";
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useAuth } from "../../../../firebase/auth";
import Link from "next/link";

const Provider = new GoogleAuthProvider();

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { authUser, isLoading } = useAuth();
    const [showAlert, setShowAlert] = useState(false);

    const loginHandler = async () => {
        if (!email || !password) return;
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("An error occurred", error);
            // You can log specific error codes for better debugging
            console.error("Firebase error code:", error.code);
        }
    };
    
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, Provider);
        } catch (error) {
            console.error("An error occurred", error);
        }
    };
   
    return (
        <main className="d-flex justify-content-center align-items-center lg:h-screen">
            <div className="w-50 p-4 md:p-14">
                <h1 className="text-6xl font-semibold text-center">Login</h1>
                <p className="mt-3 text-center">
                    Don't have an account?{" "}
                    <Link href="/pages/Register" className="text-decoration-none">
                        Sign Up
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
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="btn btn-dark w-100 mt-4"
                        onClick={loginHandler}
                    >
                        Sign in
                    </button>
                </form>
                {showAlert && (
                    <div className="mt-4 alert alert-success">
                        Login successful! Welcome, {authUser.displayName || "User"}.
                    </div>
                )}
            </div>
            <div
                className="w-50 bg-secondary bg-cover bg-center-top"
                style={{
                    backgroundImage: "url('/login-banner.jpg')", // Replace with your image path
                    backgroundSize: "100%", // Set the background size to cover the container
                    height: "100vh",
                }}
            ></div>
        </main>
    );
};

export default LoginForm;



