"use client";
import React, { useState } from "react";

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignupFormProps = {
  onSubmit?: (values: SignupFormValues) => void;
};

export const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<SignupFormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!values.name.trim()) errs.name = "Name is required";
    if (!values.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      errs.email = "Invalid email";
    if (values.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (values.password !== values.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    onSubmit?.(values);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md space-y-3 border rounded-lg p-4 bg-white shadow-sm"
      data-testid="signup-form"
    >
      <h2 className="text-xl font-semibold mb-2">Create an Account</h2>

      <Input
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
      >
        Sign Up
      </button>

      {submitted && (
        <p className="text-green-600 font-medium text-sm text-center">
          ✅ Signup successful!
        </p>
      )}
    </form>
  );
};

function Input({
  label,
  error,
  name,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) {
  const id = `input-${name}`;

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        {...props}
        className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
