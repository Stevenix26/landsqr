"use client";

import React, { useState } from "react";
import styles from "@/styles/login.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Fake login check
    if (email === "test@lendsqr.com" && password === "password") {
      localStorage.setItem("lendsqr_token", "fake-jwt-token");
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* ===== Left Panel ===== */}
      <div className={styles.leftPanel}>
        <div className={styles.logoWrapper}>
          <Image src="/images/lendsqr.svg" alt="Logo" width={150} height={40} />
        </div>
        <div className={styles.illustrationWrapper}>
          <Image
            src="/images/login-illustration.png"
            alt="Illustration"
            width={500}
            height={500}
          />
        </div>
      </div>

      {/* ===== Right Panel ===== */}
      <div className={styles.rightPane}>
        <div className={styles.formWrapper}>
          <h1 className={styles.welcome}>Welcome!</h1>
          <p className={styles.subtitle}>Enter details to login.</p>

          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  className={styles.showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <a href="#" className={styles.forgotPassword}>
              FORGOT PASSWORD?
            </a>

            {error && (
              <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>
            )}

            <button type="submit" className={styles.loginButton}>
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
