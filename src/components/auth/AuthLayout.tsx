import { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pycharm-bg to-pycharm-surface p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-pycharm-text">
            {title}
          </h2>
          <p className="mt-2 text-pycharm-text-dim">
            {subtitle}
          </p>
        </div>

        <div className="bg-pycharm-surface/50 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-pycharm-border">
          {children}
        </div>
      </div>
    </div>
  );
};