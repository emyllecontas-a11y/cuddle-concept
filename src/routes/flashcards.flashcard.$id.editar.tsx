import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ChevronLeft, Trash2, History, Sparkles } from "lucide-react";

export const Route = createFileRoute("/flashcards/flashcard/$id/editar")({
  head: () => ({ meta: [{ title: "Editar flashcard — RevisaFlash" }] }),
  component: EditarFlashcardPage,
});

function EditarFlashcardPage() {
  return (
    <AppShell breadcrumb="Flashcards · Editar cartão" title="Editar flashcard">
      <Link to="/flashcards/baralho/$id" params={{ id: "d1" }} className="-mt-2 mb-6 inline-flex items-center gap-1 text-xs font-medium text-foreground/55 hover:text-foreground">
        <ChevronLeft className="h-3.5 w-3.5" /> Voltar ao baralho
      </Link>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-foreground/55">
          <span className="rounded-full bg-white/5 px-2 py-0.5 font-medium">Card #14</span>
          <span>·</span>
          <span>Patologia Oral — Essencial</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1 text-primary"><Sparkles className="h-3 w-3" /> Maturidade 82%</span>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/15">
          <Trash2 className="h-3.5 w-3.5" /> Excluir cartão
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="space-y-4 lg:col-span-2">
          <div className="rf-card p-6">
            <header className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">Pergunta</span>
              <span className="text-xs text-foreground/45">Frente do cartão</span>
            </header>
            <textarea
              rows={4}
              defaultValue="Qual o aspecto radiográfico característico do ameloblastoma multicístico?"
              className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 font-display text-base outline-none focus:border-primary"
            />
          </div>

          <div className="rf-card p-6">
            <header className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-accent">Resposta</span>
              <span className="text-xs text-foreground/45">Verso do cartão</span>
            </header>
            <textarea
              rows={6}
              defaultValue={`Imagem multilocular em "favo de mel" ou "bolhas de sabão", com reabsorção radicular frequente e expansão das corticais.`}
              className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm leading-relaxed outline-none focus:border-primary"
            />
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rf-card p-5">
            <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-foreground/40">Organização</h3>
            <Field label="Baralho">
              <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary">
                <option>Patologia Oral — Essencial</option>
                <option>Periodontia — Diagnóstico</option>
              </select>
            </Field>
            <Field label="Tópico">
              <input defaultValue="Lesões ósseas" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
            </Field>
            <Field label="Tags">
              <div className="flex flex-wrap gap-1.5">
                {["#patologia", "#ameloblastoma", "#enare"].map((t) => (
                  <span key={t} className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">{t}</span>
                ))}
              </div>
            </Field>
          </div>

          <div className="rf-card p-5">
            <header className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-foreground/40">
              <History className="h-3 w-3 text-primary" /> Histórico de revisões
            </header>
            <ul className="space-y-2 text-xs">
              {[
                { d: "23/06", r: "Bom", c: "text-primary" },
                { d: "18/06", r: "Difícil", c: "text-warning" },
                { d: "10/06", r: "Bom", c: "text-primary" },
                { d: "02/06", r: "Errei", c: "text-accent" },
              ].map((h) => (
                <li key={h.d} className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0 last:pb-0">
                  <span className="text-foreground/55 tabular-nums">{h.d}</span>
                  <span className={`font-medium ${h.c}`}>{h.r}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <footer className="mt-8 flex items-center justify-end gap-2">
        <Link to="/flashcards/baralho/$id" params={{ id: "d1" }} className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/65 hover:bg-white/5">Cancelar</Link>
        <button className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Salvar alterações</button>
      </footer>
    </AppShell>
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
