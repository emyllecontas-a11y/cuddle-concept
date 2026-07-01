import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Lock, User } from "lucide-react";
import { LogoIcon } from "@/components/LogoIcon";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar conta — RevisaFlash" },
      { name: "description", content: "Crie sua conta no RevisaFlash." },
    ],
  }),
  component: CadastroPage,
});

function CadastroPage() {
  const isDev = import.meta.env.DEV;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-elevated rf-fade-in">
        <div className="mb-8 flex flex-col items-center text-center">
          <LogoIcon size={56} className="mb-4" />
          <h1 className="font-display text-2xl font-semibold text-foreground">RevisaFlash</h1>
          <p className="mt-2 font-display text-lg font-medium text-foreground">Criar conta</p>
          <p className="mt-1 text-sm text-foreground/55">
            Leva menos de um minuto para começar.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground/70">Nome</label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 transition-colors focus-within:border-primary">
              <User className="h-4 w-4 text-foreground/40" />
              <input
                type="text"
                defaultValue="Mariana Souza"
                className="w-full bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-foreground/30"
                placeholder="Seu nome completo"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground/70">E-mail</label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 transition-colors focus-within:border-primary">
              <Mail className="h-4 w-4 text-foreground/40" />
              <input
                type="email"
                className="w-full bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-foreground/30"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground/70">Senha</label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 transition-colors focus-within:border-primary">
              <Lock className="h-4 w-4 text-foreground/40" />
              <input
                type="password"
                className="w-full bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-foreground/30"
                placeholder="Mínimo 8 caracteres"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground/70">
              Confirmar senha
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 transition-colors focus-within:border-primary">
              <Lock className="h-4 w-4 text-foreground/40" />
              <input
                type="password"
                className="w-full bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-foreground/30"
                placeholder="Repita sua senha"
              />
            </div>
          </div>

          <Link
            to="/"
            className="flex w-full items-center justify-center rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Criar conta
          </Link>
        </form>

        <p className="mt-6 text-center text-xs text-foreground/55">
          Já tem uma conta?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Entrar
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
