import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <AuthLayout
      title="Bem-vindo de volta"
      subtitle="Entre na sua conta para continuar"
    >
      <LoginForm />
      <div className="text-center mt-6">
        <p className="text-pycharm-text-dim">
          Não tem uma conta?{" "}
          <Link
            to="/signup"
            className="text-pycharm-accent hover:text-pycharm-accent-hover transition-colors font-medium"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;