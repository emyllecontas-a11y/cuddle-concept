import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ChevronLeft, Sparkles, ImageIcon, Bold, Italic, List } from "lucide-react";

export const Route = createFileRoute("/flashcards/baralho/$id/novo-flashcard")({
  head: () => ({ meta: [{ title: "Novo flashcard — RevisaFlash" }] }),
  component: NovoFlashcardPage,
});

function NovoFlashcardPage() {
  return (
    <AppShell breadcrumb="Flashcards · Novo cartão" title="Criar novo flashcard">
      <Link to="/flashcards/baralho/$id" params={{ id: "d1" }} className="-mt-2 mb-6 inline-flex items-center gap-1 text-xs font-medium text-foreground/55 hover:text-foreground">
        <ChevronLeft className="h-3.5 w-3.5" /> Voltar ao baralho
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="space-y-4 lg:col-span-2">
          <div className="rf-card p-6">
            <header className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">Pergunta</span>
                <span className="text-xs text-foreground/45">Frente do cartão</span>
              </div>
              <Toolbar />
            </header>
            <textarea
              rows={5}
              defaultValue="Qual o aspecto radiográfico característico do ameloblastoma multicístico?"
              className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 font-display text-base outline-none focus:border-primary"
            />
          </div>

          <div className="rf-card p-6">
            <header className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-accent">Resposta</span>
                <span className="text-xs text-foreground/45">Verso do cartão</span>
              </div>
              <Toolbar />
            </header>
            <textarea
              rows={6}
              defaultValue={`Imagem multilocular em "favo de mel" ou "bolhas de sabão", com reabsorção radicular frequente e expansão das corticais.`}
              className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm leading-relaxed outline-none focus:border-primary"
            />
            <div className="mt-3 flex items-center gap-2 text-xs text-foreground/45">
              <ImageIcon className="h-3.5 w-3.5" /> Anexar imagem ou áudio (opcional)
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rf-card p-5">
            <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-foreground/40">Organização</h3>
            <Field label="Baralho">
              <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary">
                <option>Patologia Oral — Essencial</option>
                <option>Periodontia — Diagnóstico</option>
                <option>Cirurgia BMF</option>
              </select>
            </Field>
            <Field label="Tópico">
              <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary">
                <option>Lesões ósseas</option>
                <option>Lesões brancas</option>
                <option>Neoplasias</option>
              </select>
            </Field>
            <Field label="Dificuldade inicial">
              <div className="grid grid-cols-3 gap-2">
                {["Fácil", "Médio", "Difícil"].map((d, i) => (
                  <button key={d} className={["rounded-lg border px-2 py-1.5 text-xs", i === 1 ? "border-primary/60 bg-primary/10 text-primary" : "border-border bg-background text-foreground/65"].join(" ")}>{d}</button>
                ))}
              </div>
            </Field>
          </div>

          <div className="rf-card p-5">
            <header className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-foreground/40">
              <Sparkles className="h-3 w-3 text-primary" /> Pré-visualização
            </header>
            <div className="rounded-xl border border-border bg-background/60 p-4">
              <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary">Pergunta</div>
              <p className="mt-2 font-display text-sm font-medium leading-snug">Qual o aspecto radiográfico característico do ameloblastoma multicístico?</p>
            </div>
          </div>
        </aside>
      </div>

      <footer className="mt-8 flex flex-wrap items-center justify-end gap-2">
        <Link to="/flashcards/baralho/$id" params={{ id: "d1" }} className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/65 hover:bg-white/5">Cancelar</Link>
        <button className="rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-white/5">Salvar e criar outro</button>
        <button className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Salvar cartão</button>
      </footer>
    </AppShell>
  );
}

function Toolbar() {
  return (
    <div className="flex items-center gap-0.5 rounded-md border border-border bg-background/60 p-0.5 text-foreground/55">
      <button className="grid h-6 w-6 place-items-center rounded hover:bg-white/5 hover:text-foreground"><Bold className="h-3 w-3" /></button>
      <button className="grid h-6 w-6 place-items-center rounded hover:bg-white/5 hover:text-foreground"><Italic className="h-3 w-3" /></button>
      <button className="grid h-6 w-6 place-items-center rounded hover:bg-white/5 hover:text-foreground"><List className="h-3 w-3" /></button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-3 block last:mb-0">
      <span className="mb-1 block text-xs font-medium text-foreground/70">{label}</span>
      {children}
    </label>
  );
}
