import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ChevronLeft, Plus, ChevronRight, FileText, Layers } from "lucide-react";

export const Route = createFileRoute("/conteudo/disciplina/$nome/")({
  head: () => ({ meta: [{ title: "Disciplina — RevisaFlash" }] }),
  component: DisciplinaPage,
});

const TOPICOS = [
  { id: "t1", nome: "Lesões fundamentais", desc: "Mácula, pápula, vesícula, bolha, úlcera, nódulo.", materiais: 4, cards: 38, progresso: 92 },
  { id: "t2", nome: "Lesões brancas", desc: "Líquen plano, leucoplasia, candidíase, queratose friccional.", materiais: 6, cards: 52, progresso: 74 },
  { id: "t3", nome: "Lesões vermelhas e pigmentadas", desc: "Eritroplasia, hemangiomas, melanose.", materiais: 3, cards: 28, progresso: 48 },
  { id: "t4", nome: "Lesões ósseas", desc: "Cistos odontogênicos, tumores benignos e malignos.", materiais: 5, cards: 61, progresso: 35 },
  { id: "t5", nome: "Neoplasias malignas", desc: "Carcinoma espinocelular, linfomas, sarcomas.", materiais: 4, cards: 44, progresso: 20 },
  { id: "t6", nome: "Doenças das glândulas salivares", desc: "Sialolitíase, síndrome de Sjögren, tumores.", materiais: 2, cards: 22, progresso: 0 },
];

function DisciplinaPage() {
  const { nome } = Route.useParams();
  const titulo = decodeURIComponent(nome).replace(/-/g, " ");

  return (
    <AppShell breadcrumb={`Conteúdo · ${titulo}`}>
      <Link to="/conteudo" className="mb-4 inline-flex items-center gap-1 text-xs font-medium text-foreground/55 hover:text-foreground">
        <ChevronLeft className="h-3.5 w-3.5" /> Voltar para Disciplinas
      </Link>

      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-2xl">🔬</div>
          <div>
            <span className="text-[11px] font-medium uppercase tracking-widest text-foreground/40">Disciplina</span>
            <h1 className="font-display text-2xl font-semibold capitalize tracking-tight sm:text-3xl">{titulo}</h1>
            <p className="mt-1 max-w-xl text-sm text-foreground/55">Lesões fundamentais, neoplasias, doenças autoimunes e correlações clínico-patológicas.</p>
          </div>
        </div>
        <Link to="/conteudo/disciplina/$nome/novo-topico" params={{ nome }} className="inline-flex items-center gap-1.5 self-start rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 sm:self-auto">
          <Plus className="h-3.5 w-3.5" /> Novo tópico
        </Link>
      </header>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Mini icon={<Layers className="h-4 w-4" />} l="Tópicos" v={TOPICOS.length} />
        <Mini icon={<FileText className="h-4 w-4" />} l="Materiais" v={TOPICOS.reduce((a, t) => a + t.materiais, 0)} />
        <Mini l="Cards" v={TOPICOS.reduce((a, t) => a + t.cards, 0)} />
        <Mini l="Progresso" v="58%" tone="accent" />
      </div>

      <h2 className="mb-3 font-display text-base font-semibold">Tópicos</h2>
      <div className="grid gap-3">
        {TOPICOS.map((t) => (
          <article key={t.id} className="rf-card rf-card-hover group flex items-center gap-4 p-5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-background/60 font-display text-sm font-semibold text-foreground/70 tabular-nums">
              {t.id.replace("t", "")}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold sm:text-base">{t.nome}</h3>
              <p className="mt-0.5 truncate text-xs text-foreground/45">{t.desc}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                  <div className={["h-full rounded-full transition-all", t.progresso === 0 ? "bg-foreground/15" : "bg-gradient-to-r from-primary to-primary/60"].join(" ")} style={{ width: `${t.progresso}%` }} />
                </div>
                <span className="w-10 text-right text-xs font-medium tabular-nums text-foreground/70">{t.progresso}%</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-foreground/45">
                <span>{t.materiais} materiais</span>
                <span>·</span>
                <span>{t.cards} cards</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-foreground/30 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
          </article>
        ))}
      </div>
    </AppShell>
  );
}

function Mini({ l, v, icon, tone }: { l: string; v: React.ReactNode; icon?: React.ReactNode; tone?: "accent" }) {
  return (
    <div className="rf-card p-4">
      {icon && <div className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">{icon}</div>}
      <div className="text-[10px] font-medium uppercase tracking-widest text-foreground/40">{l}</div>
      <div className={["mt-1 font-display text-xl font-semibold tabular-nums", tone === "accent" ? "text-accent" : ""].join(" ")}>{v}</div>
    </div>
  );
}
