import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-muted-foreground">Sign in to your account</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <Auth 
            supabaseClient={supabase} 
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(var(--primary))',
                    brandAccent: 'hsl(var(--primary))',
                    inputBackground: 'hsl(var(--secondary))',
                    inputText: 'hsl(var(--foreground))',
                    inputPlaceholder: 'hsl(var(--muted-foreground))',
                  }
                }
              }
            }}
            view="sign_in"
            theme="dark"
            providers={[]}
          />
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup">
              <Button variant="link" className="text-primary">Create one</Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;