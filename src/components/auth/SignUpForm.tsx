import { useState } from "react";
import { AuthError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema, type SignupFormValues } from "./schemas/signupSchema";
import { AuthFormField } from "./FormField";

export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleAuthError = (error: AuthError) => {
    switch (error.message) {
      case "User already registered":
        return "Este email já está registrado";
      case "Signup disabled":
        return "O registro de novos usuários está desativado";
      default:
        return "Ocorreu um erro ao criar sua conta. Tente novamente.";
    }
  };

  const onSubmit = async (values: SignupFormValues) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(handleAuthError(error));
      } else {
        toast.success("Conta criada com sucesso! Verifique seu email para confirmar.");
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao criar sua conta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AuthFormField
          form={form}
          name="email"
          label="Email"
          type="email"
          placeholder="seu@email.com"
        />

        <AuthFormField
          form={form}
          name="password"
          label="Senha"
          type="password"
          placeholder="••••••••"
        />

        <AuthFormField
          form={form}
          name="confirmPassword"
          label="Confirme sua senha"
          type="password"
          placeholder="••••••••"
        />

        <Button
          type="submit"
          className="w-full bg-pycharm-accent hover:bg-pycharm-accent-hover text-pycharm-text shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          disabled={isLoading}
        >
          {isLoading ? "Criando conta..." : "Criar conta"}
        </Button>
      </form>
    </Form>
  );
};