import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignUpForm } from "@/components/auth/SignUpForm";

const SignUp = () => {
  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Comece sua jornada agora mesmo"
    >
      <SignUpForm />
      <div className="text-center mt-6">
        <p className="text-pycharm-text-dim">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="text-pycharm-accent hover:text-pycharm-accent-hover transition-colors font-medium"
          >
            Fazer login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;