import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ChevronLeft, Pencil, Filter, AlertTriangle, Plus } from "lucide-react";

export const Route = createFileRoute("/erros/disciplina/$nome")({
  head: () => ({ meta: [{ title: "Erros da disciplina — RevisaFlash" }] }),
  component: ErrosDisciplinaPage,
});

const ERROS = [
  { id: 1, q: "Sobre o líquen plano oral, qual variante apresenta MAIOR risco de transformação maligna?", correta: "Erosivo/atrófico", tipo: "Conceito", data: "23/06", repet: 3 },
  { id: 2, q: "Lesão multilocular em corpo mandibular, paciente de 32 anos, com expansão das corticais. Diagnóstico mais provável?", correta: "Ameloblastoma", tipo: "Interpretação", data: "21/06", repet: 1 },
  { id: 3, q: "Qual a célula de origem do tumor odontogênico ceratocístico?", correta: "Restos da lâmina dentária", tipo: "Memória", data: "18/06", repet: 2 },
  { id: 4, q: "Critério histopatológico que define carcinoma in situ.", correta: "Displasia de espessura total sem invasão da membrana basal", tipo: "Conceito", data: "15/06", repet: 4 },
  { id: 5, q: "Característica clínica que distingue leucoplasia de candidíase pseudomembranosa.", correta: "Leucoplasia não destaca à raspagem", tipo: "Atenção", data: "12/06", repet: 1 },
];

function ErrosDisciplinaPage() {
  const { nome } = Route.useParams();
  const titulo = decodeURIComponent(nome).replace(/-/g, " ");

  return (
    <AppShell breadcrumb={`Erros · ${titulo}`}>
      <Link to="/erros" className="mb-4 inline-flex items-center gap-1 text-xs font-medium text-foreground/55 hover:text-foreground">
        <ChevronLeft className="h-3.5 w-3.5" /> Voltar para grandes áreas
      </Link>

      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-widest text-foreground/40">Disciplina</span>
          <h1 className="font-display text-2xl font-semibold capitalize tracking-tight sm:text-3xl">{titulo}</h1>
          <p className="mt-1 text-sm text-foreground/55">Todos os erros registrados nesta grande área.</p>
        </div>
        <button className="inline-flex items-center gap-1.5 self-start rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 sm:self-auto">
          <Plus className="h-3.5 w-3.5" /> Registrar erro
        </button>
      </header>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Kpi label="Erros ativos" value={ERROS.length} accent />
        <Kpi label="Reincidentes" value={ERROS.filter((e) => e.repet > 1).length} />
        <Kpi label="Conceito" value={ERROS.filter((e) => e.tipo === "Conceito").length} />
        <Kpi label="Resolvidos no mês" value={9} />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-xs text-foreground/55">
          <Filter className="h-3.5 w-3.5" /> Ordenado por reincidência
        </div>
        <div className="flex gap-1">
          {["Todos", "Conceito", "Interpretação", "Memória"].map((t, i) => (
            <button key={t} className={["rounded-full px-3 py-1 text-[11px] font-medium", i === 0 ? "bg-primary text-primary-foreground" : "border border-border bg-surface text-foreground/65 hover:bg-surface-2"].join(" ")}>{t}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {ERROS.map((e) => (
          <article key={e.id} className="rf-card rf-card-hover flex items-start gap-4 p-5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <TipoBadge t={e.tipo} />
                {e.repet > 1 && <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">×{e.repet} reincidências</span>}
                <span className="text-[11px] text-foreground/45">Registrado em {e.data}</span>
              </div>
              <p className="mt-1.5 text-sm font-medium leading-snug text-foreground">{e.q}</p>
              <p className="mt-1 text-xs text-foreground/55"><span className="text-foreground/40">Resposta:</span> {e.correta}</p>
            </div>
            <button className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border bg-surface-2 text-foreground/60 transition-colors hover:border-primary/50 hover:text-primary" aria-label="Editar">
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </article>
        ))}
      </div>
    </AppShell>
  );
}

function Kpi({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rf-card p-4">
      <div className="text-[10px] font-medium uppercase tracking-widest text-foreground/40">{label}</div>
      <div className={["mt-1 font-display text-2xl font-semibold tabular-nums", accent ? "text-accent" : "text-foreground"].join(" ")}>{value}</div>
    </div>
  );
}

function TipoBadge({ t }: { t: string }) {
  const map: Record<string, string> = {
    "Conceito": "bg-primary/10 text-primary",
    "Interpretação": "bg-warning/15 text-warning",
    "Memória": "bg-white/5 text-foreground/65",
    "Atenção": "bg-accent/10 text-accent",
  };
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${map[t] ?? ""}`}>{t}</span>;
}
