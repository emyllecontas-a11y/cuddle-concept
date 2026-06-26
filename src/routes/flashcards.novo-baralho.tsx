import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ChevronLeft, Layers, Sparkles, Tag } from "lucide-react";

export const Route = createFileRoute("/flashcards/novo-baralho")({
  head: () => ({ meta: [{ title: "Novo baralho — RevisaFlash" }] }),
  component: NovoBaralhoPage,
});

function NovoBaralhoPage() {
  return (
    <AppShell breadcrumb="Flashcards · Novo baralho" title="Criar novo baralho">
      <Link to="/flashcards" className="-mt-2 mb-6 inline-flex items-center gap-1 text-xs font-medium text-foreground/55 hover:text-foreground">
        <ChevronLeft className="h-3.5 w-3.5" /> Voltar para Flashcards
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rf-card p-6 lg:col-span-2">
          <header className="mb-5 flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold">Informações do baralho</h2>
              <p className="text-xs text-foreground/45">Defina o assunto e o ritmo de revisão.</p>
            </div>
          </header>

          <div className="space-y-4">
            <Field label="Nome do baralho">
              <input defaultValue="Patologia Oral — Essencial" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
            </Field>

            <Field label="Descrição" hint="Resuma em uma frase o que esse baralho cobre.">
              <textarea rows={3} defaultValue="Lesões fundamentais, brancas, vermelhas e pigmentadas com foco em diagnóstico diferencial." className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Disciplina vinculada">
                <select className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
                  <option>Patologia Oral e Maxilofacial</option>
                  <option>Periodontia</option>
                  <option>Cirurgia BMF</option>
                  <option>Endodontia</option>
                </select>
              </Field>
              <Field label="Cor de destaque">
                <div className="flex items-center gap-2">
                  {["#14B8A6", "#FB7185", "#F59E0B", "#60A5FA", "#A78BFA"].map((c) => (
                    <button key={c} aria-label={c} className="h-8 w-8 rounded-full border border-border" style={{ background: c }} />
                  ))}
                </div>
              </Field>
            </div>

            <Field label="Tags">
              <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                {["#enare", "#patologia", "#essencial"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                    <Tag className="h-3 w-3" /> {t}
                  </span>
                ))}
                <input placeholder="Adicionar tag…" className="flex-1 min-w-[120px] bg-transparent py-1 text-xs outline-none placeholder:text-foreground/35" />
              </div>
            </Field>
          </div>
        </section>

        <aside className="rf-card p-6">
          <header className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-foreground/40">
            <Sparkles className="h-3 w-3 text-accent" /> FSRS · Pré-visualização
          </header>
          <div className="rounded-xl border border-border bg-background/60 p-4">
            <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary">Pergunta</div>
            <p className="mt-2 font-display text-base font-medium leading-snug">Como seu primeiro cartão aparecerá no estudo?</p>
            <p className="mt-3 text-xs text-foreground/45">Você poderá adicionar cards após criar o baralho.</p>
          </div>
          <ul className="mt-5 space-y-2 text-xs text-foreground/65">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Revisão espaçada automática</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Sincronizado com sua agenda</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> Acompanha banco de erros</li>
          </ul>
        </aside>
      </div>

      <footer className="mt-8 flex items-center justify-end gap-2">
        <Link to="/flashcards" className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/65 hover:bg-white/5">Cancelar</Link>
        <button className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Criar baralho</button>
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
