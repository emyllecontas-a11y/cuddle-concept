import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ChevronLeft, Clock, BookOpen, Brain, FileText } from "lucide-react";

export const Route = createFileRoute("/calendario/registrar")({
  head: () => ({ meta: [{ title: "Registrar estudo — RevisaFlash" }] }),
  component: RegistrarEstudoPage,
});

function RegistrarEstudoPage() {
  return (
    <AppShell breadcrumb="Calendário · Registrar estudo" title="Registrar estudo">
      <Link to="/calendario" className="-mt-2 mb-6 inline-flex items-center gap-1 text-xs font-medium text-foreground/55 hover:text-foreground">
        <ChevronLeft className="h-3.5 w-3.5" /> Voltar ao calendário
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="space-y-5 lg:col-span-2">
          <div className="rf-card p-6">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-foreground/40">Tipo de estudo</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <TipoCard icon={<BookOpen className="h-4 w-4" />} label="Teórico" desc="Leitura, resumo, videoaula" active />
              <TipoCard icon={<Brain className="h-4 w-4" />} label="Prático" desc="Questões, flashcards, simulado" />
            </div>
          </div>

          <div className="rf-card p-6">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-foreground/40">Detalhes</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Data">
                <input type="date" defaultValue="2026-06-26" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </Field>
              <Field label="Duração">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
                  <Clock className="h-3.5 w-3.5 text-foreground/40" />
                  <input type="time" defaultValue="01:30" className="flex-1 bg-transparent text-sm outline-none" />
                  <span className="text-xs text-foreground/45">h</span>
                </div>
              </Field>
              <Field label="Disciplina">
                <select className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
                  <option>Patologia Oral e Maxilofacial</option>
                  <option>Periodontia</option>
                  <option>Cirurgia BMF</option>
                  <option>Endodontia</option>
                </select>
              </Field>
              <Field label="Tópico">
                <input defaultValue="Lesões fundamentais" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Observações">
                <textarea rows={3} placeholder="Resumo, dúvidas que ficaram, próximos passos…" className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </Field>
            </div>
          </div>

          <div className="rf-card p-6">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-foreground/40">Métricas opcionais</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <Metric label="Questões resolvidas" value="32" />
              <Metric label="Acertos" value="24" accent />
              <Metric label="Cards revisados" value="18" />
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rf-card p-5">
            <header className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-foreground/40">
              <FileText className="h-3 w-3 text-primary" /> Resumo
            </header>
            <ul className="space-y-2 text-xs">
              <Row k="Tipo" v="Teórico" />
              <Row k="Disciplina" v="Patologia Oral" />
              <Row k="Tópico" v="Lesões fundamentais" />
              <Row k="Data" v="26/06/2026" />
              <Row k="Duração" v="1h30" />
            </ul>
            <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-3 text-[11px] text-foreground/70">
              Esse registro entra na sua sequência diária e na heatmap de desempenho.
            </div>
          </div>
        </aside>
      </div>

      <footer className="mt-8 flex items-center justify-end gap-2">
        <Link to="/calendario" className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/65 hover:bg-white/5">Cancelar</Link>
        <button className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Salvar estudo</button>
      </footer>
    </AppShell>
  );
}

function TipoCard({ icon, label, desc, active }: { icon: React.ReactNode; label: string; desc: string; active?: boolean }) {
  return (
    <button className={[
      "flex items-start gap-3 rounded-xl border p-4 text-left transition-colors",
      active ? "border-primary/60 bg-primary/5" : "border-border bg-background hover:border-primary/40",
    ].join(" ")}>
      <div className={["grid h-9 w-9 place-items-center rounded-lg", active ? "bg-primary/15 text-primary" : "bg-white/5 text-foreground/55"].join(" ")}>
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-[11px] text-foreground/50">{desc}</div>
      </div>
      {active && <span className="ml-auto h-2 w-2 rounded-full bg-primary" />}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-foreground/70">{label}</span>
      {children}
    </label>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-3">
      <div className="text-[10px] font-medium uppercase tracking-widest text-foreground/40">{label}</div>
      <input defaultValue={value} className={["mt-1 w-full bg-transparent font-display text-xl font-semibold tabular-nums outline-none", accent ? "text-accent" : "text-foreground"].join(" ")} />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0 last:pb-0">
      <span className="text-foreground/50">{k}</span>
      <span className="font-medium text-foreground/85">{v}</span>
    </li>
  );
}
