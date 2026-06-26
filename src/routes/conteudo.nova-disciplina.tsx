import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ChevronLeft, BookOpen } from "lucide-react";

export const Route = createFileRoute("/conteudo/nova-disciplina")({
  head: () => ({ meta: [{ title: "Nova disciplina — RevisaFlash" }] }),
  component: NovaDisciplinaPage,
});

const ICONES = ["🔬", "💉", "🩸", "🦷", "👶", "📷", "🏛️", "💊", "🧫", "⚖️", "🚨", "🧬"];

function NovaDisciplinaPage() {
  return (
    <AppShell breadcrumb="Conteúdo · Nova disciplina" title="Criar nova disciplina">
      <Link to="/conteudo" className="-mt-2 mb-6 inline-flex items-center gap-1 text-xs font-medium text-foreground/55 hover:text-foreground">
        <ChevronLeft className="h-3.5 w-3.5" /> Voltar para Conteúdo
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rf-card p-6 lg:col-span-2">
          <header className="mb-5 flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold">Dados da disciplina</h2>
              <p className="text-xs text-foreground/45">Defina nome, descrição e meta de estudo.</p>
            </div>
          </header>

          <div className="space-y-4">
            <Field label="Nome da disciplina">
              <input defaultValue="Patologia Oral e Maxilofacial" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
            </Field>
            <Field label="Descrição" hint="Aparece nos cards de listagem.">
              <textarea rows={3} defaultValue="Disciplina dedicada ao estudo de lesões fundamentais, neoplasias, doenças autoimunes e correlações clínico-patológicas." className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Peso na prova">
                <select className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
                  <option>Alto (12%+)</option>
                  <option>Médio (6-12%)</option>
                  <option>Baixo (até 6%)</option>
                </select>
              </Field>
              <Field label="Meta semanal (h)">
                <input type="number" defaultValue="6" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </Field>
            </div>

            <Field label="Ícone">
              <div className="flex flex-wrap gap-2">
                {ICONES.map((i, idx) => (
                  <button key={i} className={["grid h-10 w-10 place-items-center rounded-lg border text-lg transition-colors", idx === 0 ? "border-primary/60 bg-primary/10" : "border-border bg-background hover:border-primary/40"].join(" ")}>
                    {i}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        </section>

        <aside className="rf-card p-6">
          <header className="mb-4 text-[10px] font-medium uppercase tracking-widest text-foreground/40">Pré-visualização</header>
          <article className="rf-card flex items-center gap-4 p-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-lg">🔬</div>
            <div className="min-w-0">
              <div className="text-sm font-semibold">Patologia Oral e Maxilofacial</div>
              <div className="mt-0.5 text-[11px] text-foreground/45">0 tópicos · 0 cards</div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-0 rounded-full bg-primary" />
              </div>
            </div>
          </article>
          <p className="mt-4 text-xs text-foreground/55">
            Você poderá adicionar tópicos e materiais após criar a disciplina.
          </p>
        </aside>
      </div>

      <footer className="mt-8 flex items-center justify-end gap-2">
        <Link to="/conteudo" className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/65 hover:bg-white/5">Cancelar</Link>
        <button className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Criar disciplina</button>
      </footer>
    </AppShell>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-xs font-medium text-foreground/70">{label}</span>
        {hint && <span className="text-[10px] text-foreground/40">{hint}</span>}
      </span>
      {children}
    </label>
  );
}
