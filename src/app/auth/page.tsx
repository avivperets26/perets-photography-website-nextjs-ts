// src/app/auth/page.tsx

"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./auth.module.css";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignupSchema = z.infer<typeof signupSchema>;

// Rest of your component

export default function AuthPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const auth = getAuth();

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: signUpErrors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    formState: { errors: signInErrors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignUp = async (data: SignupSchema) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSignIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authWrapper}>
        <div className={styles.signInWrapper}>
          <h2 className={styles.title}>Already have an account?</h2>
          <p className={styles.subtitle}>
            Sign in with your email and password
          </p>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <form
            onSubmit={handleSubmitSignIn(handleSignIn)}
            className={styles.form}
          >
            <div>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                {...registerSignIn("email", { required: true })}
                className={styles.input}
              />
              {signInErrors.email && (
                <p className={styles.errorMessage}>Email is required</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                {...registerSignIn("password", { required: true })}
                className={styles.input}
              />
              {signInErrors.password && (
                <p className={styles.errorMessage}>Password is required</p>
              )}
            </div>
            <button type="submit" className={styles.button}>
              Sign In
            </button>
            <button
              type="button"
              className={styles.button}
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </button>
          </form>
        </div>
        <div className={styles.signUpWrapper}>
          <h2 className={styles.title}>Don&apos;t have an account?</h2>
          <p className={styles.subtitle}>
            Sign up with your email and password
          </p>
          <form
            onSubmit={handleSubmitSignUp(handleSignUp)}
            className={styles.form}
          >
            <div>
              <label htmlFor="name" className={styles.label}>
                Display Name
              </label>
              <input
                type="text"
                id="name"
                {...registerSignUp("name")}
                className={styles.input}
              />
              {signUpErrors.name && (
                <p className={styles.errorMessage}>
                  {signUpErrors.name.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                {...registerSignUp("email")}
                className={styles.input}
              />
              {signUpErrors.email && (
                <p className={styles.errorMessage}>
                  {signUpErrors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                {...registerSignUp("password")}
                className={styles.input}
              />
              {signUpErrors.password && (
                <p className={styles.errorMessage}>
                  {signUpErrors.password.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...registerSignUp("confirmPassword")}
                className={styles.input}
              />
              {signUpErrors.confirmPassword && (
                <p className={styles.errorMessage}>
                  {signUpErrors.confirmPassword.message}
                </p>
              )}
            </div>
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="/images/zin.jpg"
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          className={styles.backgroundImage}
        />
      </div>
    </div>
  );
}
