import React from "react";
import Link from "next/link";
import RegistrationForm from "../_components/RegistrationForm";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-xl border bg-white p-8 shadow-sm">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to RentNest
          </h1>
          <p className="text-sm text-gray-500">
            Enter the information below to create your account.
          </p>
        </div>

        {/* Form */}
        <RegistrationForm />

        {/* Footer link */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-teal-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;