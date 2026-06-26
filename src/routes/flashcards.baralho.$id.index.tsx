import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ChevronLeft, Plus, Pencil, Search, Layers, Filter } from "lucide-react";

export const Route = createFileRoute("/flashcards/baralho/$id/")({
  head: () => ({ meta: [{ title: "Baralho — RevisaFlash" }] }),
  component: BaralhoPage,
});

const CARDS = [
  { id: "c1", pergunta: "Qual o aspecto radiográfico característico do ameloblastoma multicístico?", resposta: "Imagem multilocular em 'favo de mel' ou 'bolhas de sabão'.", tag: "Lesões ósseas", status: "Para revisar" },
  { id: "c2", pergunta: "Diferença entre líquen plano reticular e erosivo.", resposta: "Reticular: estrias de Wickham; Erosivo: úlceras dolorosas.", tag: "Lesões brancas", status: "Novo" },
  { id: "c3", pergunta: "Qual o tratamento de escolha para queilite actínica severa?", resposta: "Vermilhonectomia ou laser de CO₂.", tag: "Pré-malignas", status: "Revisado" },
  { id: "c4", pergunta: "Características clínicas do carcinoma espinocelular bucal precoce.", resposta: "Úlcera indolor, bordas elevadas, base endurecida.", tag: "Neoplasias", status: "Para revisar" },
  { id: "c5", pergunta: "O que diferencia um fibroma de uma hiperplasia fibrosa inflamatória?", resposta: "Etiologia: fibroma surge sem trauma evidente.", tag: "Lesões nodulares", status: "Revisado" },
  { id: "c6", pergunta: "Tríade do líquen plano oral.", resposta: "Estrias brancas, atrofia/eritema e erosão.", tag: "Lesões brancas", status: "Revisado" },
];

function BaralhoPage() {
  return (
    <AppShell breadcrumb="Flashcards · Baralho">
      <Link to="/flashcards" className="mb-4 inline-flex items-center gap-1 text-xs font-medium text-foreground/55 hover:text-foreground">
        <ChevronLeft className="h-3.5 w-3.5" /> Voltar aos decks
      </Link>

      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[11px] font-medium uppercase tracking-widest text-foreground/40">Patologia Oral</span>
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Patologia Oral — Essencial</h1>
            <p className="mt-1 text-sm text-foreground/55">Lesões fundamentais, brancas, vermelhas e pigmentadas.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground/70 hover:bg-surface-2">
            <Pencil className="h-3.5 w-3.5" /> Editar baralho
          </button>
          <Link to="/flashcards/baralho/$id/novo-flashcard" params={{ id: "d1" }} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="h-3.5 w-3.5" /> Novo flashcard
          </Link>
        </div>
      </header>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Mini l="Cards" v={142} />
        <Mini l="Para revisar" v={14} tone="accent" />
        <Mini l="Novos" v={8} />
        <Mini l="Maturidade" v="74%" />
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-center gap-2 text-xs text-foreground/55">
          <Filter className="h-3.5 w-3.5" /> Todos os cards
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5">
          <Search className="h-3.5 w-3.5 text-foreground/40" />
          <input placeholder="Buscar nesse baralho…" className="w-56 bg-transparent text-xs outline-none placeholder:text-foreground/35" />
        </div>
      </div>

      <div className="grid gap-3">
        {CARDS.map((c) => (
          <article key={c.id} className="rf-card rf-card-hover group flex items-start gap-4 p-5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-background/60 font-display text-xs font-semibold text-foreground/60 tabular-nums">
              {c.id.replace("c", "")}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-2">
                <StatusBadge label={c.status} />
                <span className="text-[11px] text-foreground/45">{c.tag}</span>
              </div>
              <p className="mt-1.5 text-sm font-medium text-foreground">{c.pergunta}</p>
              <p className="mt-1 truncate text-xs text-foreground/50">{c.resposta}</p>
            </div>
            <Link to="/flashcards/flashcard/$id/editar" params={{ id: c.id }} className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border bg-surface-2 text-foreground/60 transition-colors hover:border-primary/50 hover:text-primary" aria-label="Editar">
              <Pencil className="h-3.5 w-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </AppShell>
  );
}

function Mini({ l, v, tone }: { l: string; v: React.ReactNode; tone?: "accent" }) {
  return (
    <div className="rf-card p-4">
      <div className="text-[10px] font-medium uppercase tracking-widest text-foreground/40">{l}</div>
      <div className={["mt-1 font-display text-xl font-semibold tabular-nums", tone === "accent" ? "text-accent" : ""].join(" ")}>{v}</div>
    </div>
  );
}

function StatusBadge({ label }: { label: string }) {
  const map: Record<string, string> = {
    "Para revisar": "bg-accent/10 text-accent",
    "Novo": "bg-primary/15 text-primary",
    "Revisado": "bg-white/5 text-foreground/55",
  };
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${map[label] ?? ""}`}>{label}</span>;
}
