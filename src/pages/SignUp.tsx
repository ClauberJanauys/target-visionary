import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const SignUp = () => {
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
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="mt-2 text-muted-foreground">Sign up for a new account</p>
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
            view="sign_up"
            theme="dark"
            providers={[]}
          />
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login">
              <Button variant="link" className="text-primary">Sign in</Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;