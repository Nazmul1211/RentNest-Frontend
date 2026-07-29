
import LoginForm from "../_components/LoginForm";

export const LoginPage = () => {
  return (
    <>
    <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-md space-y-6 border p-8 shadow-lg">

            {/* Form Text */}

            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Welcome Back!</h1>
                <p className="text-gray-500">Enter Your credentials to access your account</p>
            </div>

            {/* Form */}
            <LoginForm/>
        </div>
    </div>
    </>
  );
};

export default LoginPage;
