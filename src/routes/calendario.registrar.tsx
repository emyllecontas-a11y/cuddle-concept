import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ChevronLeft, Clock, BookOpen, Brain, FileText, Target, ListChecks, Layers } from "lucide-react";

export const Route = createFileRoute("/calendario/registrar")({
  head: () => ({ meta: [{ title: "Registrar estudo — RevisaFlash" }] }),
  component: RegistrarEstudoPage,
});

type Tipo = "teorico" | "pratico";

function RegistrarEstudoPage() {
  const [tipo, setTipo] = useState<Tipo>("teorico");

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
              <TipoCard
                icon={<BookOpen className="h-4 w-4" />}
                label="Teórico"
                desc="Leitura, resumo, videoaula"
                active={tipo === "teorico"}
                onClick={() => setTipo("teorico")}
              />
              <TipoCard
                icon={<Brain className="h-4 w-4" />}
                label="Prático"
                desc="Questões, flashcards, simulado"
                active={tipo === "pratico"}
                onClick={() => setTipo("pratico")}
              />
            </div>
          </div>

          {tipo === "teorico" ? <TeoricoForm /> : <PraticoForm />}
        </section>

        <aside className="space-y-4">
          <div className="rf-card p-5">
            <header className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-foreground/40">
              <FileText className="h-3 w-3 text-primary" /> Resumo
            </header>
            {tipo === "teorico" ? (
              <ul className="space-y-2 text-xs">
                <Row k="Tipo" v="Teórico" />
                <Row k="Disciplina" v="Patologia Oral" />
                <Row k="Tópico" v="Lesões fundamentais" />
                <Row k="Data" v="26/06/2026" />
                <Row k="Duração" v="1h30" />
              </ul>
            ) : (
              <ul className="space-y-2 text-xs">
                <Row k="Tipo" v="Prático" />
                <Row k="Modalidade" v="Banco de questões" />
                <Row k="Disciplina" v="Periodontia" />
                <Row k="Questões" v="40" />
                <Row k="Acertos" v="32 (80%)" />
                <Row k="Duração" v="55 min" />
              </ul>
            )}
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

function TeoricoForm() {
  return (
    <>
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
          <Field label="Material consultado">
            <input defaultValue="Neville — cap. 7 · videoaula Sanar 12min" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Observações">
            <textarea rows={3} placeholder="Resumo, dúvidas que ficaram, próximos passos…" className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
          </Field>
        </div>
      </div>
    </>
  );
}

function PraticoForm() {
  return (
    <>
      <div className="rf-card p-6">
        <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-foreground/40">Modalidade prática</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <ModCard icon={<ListChecks className="h-4 w-4" />} label="Banco de questões" active />
          <ModCard icon={<Layers className="h-4 w-4" />} label="Flashcards" />
          <ModCard icon={<Target className="h-4 w-4" />} label="Simulado" />
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
              <input type="time" defaultValue="00:55" className="flex-1 bg-transparent text-sm outline-none" />
              <span className="text-xs text-foreground/45">h</span>
            </div>
          </Field>
          <Field label="Disciplina">
            <select className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
              <option>Periodontia</option>
              <option>Patologia Oral e Maxilofacial</option>
              <option>Cirurgia BMF</option>
              <option>Endodontia</option>
            </select>
          </Field>
          <Field label="Banca / Origem">
            <select className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
              <option>ENARE 2024</option>
              <option>USP-SP 2024</option>
              <option>SES-DF 2024</option>
              <option>Outras</option>
            </select>
          </Field>
        </div>
      </div>

      <div className="rf-card p-6">
        <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-foreground/40">Desempenho</h3>
        <div className="grid gap-3 sm:grid-cols-4">
          <Metric label="Questões" value="40" />
          <Metric label="Acertos" value="32" accent />
          <Metric label="Erros" value="6" />
          <Metric label="Em branco" value="2" />
        </div>
        <div className="mt-5 rounded-xl border border-border bg-background/40 p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-foreground/70">Aproveitamento</span>
            <span className="font-display text-base font-semibold tabular-nums text-primary">80%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: "80%" }} />
          </div>
        </div>
        <div className="mt-4">
          <Field label="Observações">
            <textarea rows={3} placeholder="Tópicos errados, padrões de erro, revisões agendadas…" className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
          </Field>
        </div>
      </div>
    </>
  );
}

function TipoCard({ icon, label, desc, active, onClick }: { icon: React.ReactNode; label: string; desc: string; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={[
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

function ModCard({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className={[
      "flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-xs font-medium transition-colors",
      active ? "border-primary/60 bg-primary/5 text-primary" : "border-border bg-background text-foreground/65 hover:border-primary/40",
    ].join(" ")}>
      <span className={["grid h-7 w-7 place-items-center rounded-md", active ? "bg-primary/15 text-primary" : "bg-white/5 text-foreground/55"].join(" ")}>{icon}</span>
      {label}
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
