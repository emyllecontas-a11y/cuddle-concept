import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Lock, Github } from "lucide-react";
import { LogoIcon } from "@/components/LogoIcon";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — RevisaFlash" },
      { name: "description", content: "Acesse sua conta no RevisaFlash." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const isDev = import.meta.env.DEV;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-elevated rf-fade-in">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <LogoIcon size={56} className="mb-4" />
          <h1 className="font-display text-2xl font-semibold text-foreground">RevisaFlash</h1>
          <p className="mt-2 font-display text-lg font-medium text-foreground">Bem-vindo de volta</p>
          <p className="mt-1 text-sm text-foreground/55">
            Entre com seu e-mail e senha para continuar.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground/70">E-mail</label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 transition-colors focus-within:border-primary">
              <Mail className="h-4 w-4 text-foreground/40" />
              <input
                type="email"
                defaultValue="mariana@revisaflash.app"
                className="w-full bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-foreground/30"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm font-medium text-foreground/70">Senha</label>
              <a href="#" className="text-xs text-primary hover:underline">
                Esqueci minha senha
              </a>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 transition-colors focus-within:border-primary">
              <Lock className="h-4 w-4 text-foreground/40" />
              <input
                type="password"
                className="w-full bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-foreground/30"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Link
            to="/"
            className="flex w-full items-center justify-center rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Entrar
          </Link>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-widest text-foreground/40">
          <span className="h-px flex-1 bg-border" /> ou <span className="h-px flex-1 bg-border" />
        </div>

        {/* Social */}
        <div className="space-y-2">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface">
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
              <path
                fill="#EA4335"
                d="M12 11v3.9h5.5c-.24 1.5-1.7 4.4-5.5 4.4-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 4.6 14.6 3.5 12 3.5 6.9 3.5 2.8 7.6 2.8 12.7S6.9 21.9 12 21.9c6.9 0 9.2-4.8 9.2-7.3 0-.5-.1-.9-.1-1.3H12z"
              />
            </svg>
            Continuar com Google
          </button>
          <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface">
            <Github className="h-4 w-4" /> Continuar com GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-foreground/55">
          Não tem uma conta?{" "}
          <Link to="/cadastro" className="font-medium text-primary hover:underline">
            Criar conta
          </Link>
        </p>
      </div>

      {isDev && (
        <span className="absolute bottom-4 right-4 rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] uppercase tracking-widest text-foreground/40">
          dev
        </span>
      )}
    </div>
  );
}
