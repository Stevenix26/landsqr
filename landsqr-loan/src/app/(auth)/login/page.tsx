"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/styles/login.module.scss"; // Adjust the path as necessary

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate login: store a token in localStorage
    if (email && password) {
      localStorage.setItem("lendsqr_token", "dummy_token");
      router.push("/dashboard");
    }
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.leftPanel}>
          <div className={styles.logoWrapper}>
            <Image
              src="/images/Group.svg"
              alt="Lendsqr Logo"
              width={173.76}
              height={36}
              priority
            />
          </div>
          <div className={styles.illustrationWrapper}>
            <Image
              src="/images/loginWalk.png"
              alt="Login Illustration"
              width={600}
              height={337.57}
              priority
            />
          </div>
        </div>
        <section className={styles.rightPane}>
          <div className={styles.formWrapper}>
            <h1 className={styles.welcome}>Welcome!</h1>
            <p className={styles.subtitle}>Enter details to login.</p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.passwordWrapper}>
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className={styles.showPassword}
                  onClick={() => setShowPassword((s) => !s)}
                  tabIndex={0}
                  role="button"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </span>
              </div>
              <a href="#" className={styles.forgotPassword}>
                FORGOT PASSWORD?
              </a>
              <button type="submit" className={styles.loginButton}>
                LOG IN
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
