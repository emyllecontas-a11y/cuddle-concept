import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import {
  ChevronLeft, Upload, FileText, ImageIcon, FileSpreadsheet, Music, Trash2,
  Pencil, Plus, Layers, NotebookPen, Sparkles, MoreHorizontal,
} from "lucide-react";

export const Route = createFileRoute("/conteudo/disciplina/$nome/topico/$topicoId")({
  head: () => ({ meta: [{ title: "Tópico — RevisaFlash" }] }),
  component: TopicoPage,
});

const ANEXOS = [
  { nome: "Aula 04 — Lesões fundamentais.pdf", tipo: "PDF · 3.4 MB", icon: FileText, cor: "text-accent bg-accent/10", data: "há 2 dias" },
  { nome: "Esquema-mapa mental.png", tipo: "Imagem · 1.1 MB", icon: ImageIcon, cor: "text-primary bg-primary/10", data: "há 1 semana" },
  { nome: "Resumo Neville cap. 7.docx", tipo: "DOCX · 540 KB", icon: FileText, cor: "text-warning bg-warning/15", data: "há 2 semanas" },
  { nome: "Tabela diferencial.xlsx", tipo: "XLSX · 220 KB", icon: FileSpreadsheet, cor: "text-primary bg-primary/10", data: "há 3 semanas" },
  { nome: "Áudio-resumo prof. Marcia.mp3", tipo: "MP3 · 4.7 MB", icon: Music, cor: "text-accent bg-accent/10", data: "há 1 mês" },
];

const NOTAS = [
  { titulo: "Diferença entre úlcera e erosão", body: "Erosão atinge só o epitélio; úlcera ultrapassa a membrana basal e atinge o tecido conjuntivo. Curam de forma distinta.", data: "23/06" },
  { titulo: "Bolha vs vesícula", body: "Vesícula < 5 mm, bolha ≥ 5 mm. Conteúdo seroso ou hemorrágico. Importante na diferenciação de doenças vesicobolhosas.", data: "20/06" },
];

const CARDS = [
  { q: "Defina mácula.", maturidade: "Maduro", proxima: "em 12d" },
  { q: "Diferencie pápula de nódulo (tamanho).", maturidade: "Jovem", proxima: "amanhã" },
  { q: "Conteúdo típico de vesícula.", maturidade: "Aprendendo", proxima: "hoje" },
];

function TopicoPage() {
  const { nome, topicoId } = Route.useParams();
  const tituloDisc = decodeURIComponent(nome).replace(/-/g, " ");

  return (
    <AppShell breadcrumb={`Conteúdo · ${tituloDisc} · Tópico`}>
      <Link to="/conteudo/disciplina/$nome" params={{ nome }} className="mb-4 inline-flex items-center gap-1 text-xs font-medium text-foreground/55 hover:text-foreground">
        <ChevronLeft className="h-3.5 w-3.5" /> Voltar à disciplina
      </Link>

      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 font-display text-base font-semibold text-primary tabular-nums">
            {topicoId.replace("t", "")}
          </div>
          <div>
            <span className="text-[11px] font-medium uppercase tracking-widest text-foreground/40">{tituloDisc}</span>
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Lesões fundamentais</h1>
            <p className="mt-1 max-w-xl text-sm text-foreground/55">
              Mácula, pápula, vesícula, bolha, úlcera e nódulo — características clínicas e diagnóstico diferencial.
            </p>
          </div>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground/70 hover:bg-surface-2">
            <Pencil className="h-3.5 w-3.5" /> Editar
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-foreground/60 hover:bg-surface-2">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Mini icon={<FileText className="h-4 w-4" />} l="Materiais" v={ANEXOS.length} />
        <Mini icon={<Layers className="h-4 w-4" />} l="Flashcards" v={CARDS.length} />
        <Mini icon={<NotebookPen className="h-4 w-4" />} l="Notas" v={NOTAS.length} />
        <Mini l="Progresso" v="92%" tone="accent" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="space-y-6 lg:col-span-2">
          {/* Materiais */}
          <div className="rf-card p-6">
            <header className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-medium uppercase tracking-widest text-foreground/40">Materiais</h3>
                <p className="mt-1 text-xs text-foreground/55">PDFs, imagens, planilhas, áudios deste tópico.</p>
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
                <Upload className="h-3.5 w-3.5" /> Enviar arquivo
              </button>
            </header>

            <button className="grid w-full place-items-center gap-2 rounded-xl border border-dashed border-border bg-surface/30 px-6 py-8 text-xs text-foreground/55 transition-colors hover:border-primary/50 hover:text-primary">
              <Upload className="h-5 w-5" />
              <span className="font-medium">Arraste arquivos aqui</span>
              <span className="text-[11px] text-foreground/40">ou clique para selecionar (PDF, PNG, DOCX, XLSX, MP3)</span>
            </button>

            <ul className="mt-5 space-y-2">
              {ANEXOS.map((a) => {
                const Icon = a.icon;
                return (
                  <li key={a.nome} className="flex items-center gap-3 rounded-lg border border-border bg-background/40 p-3">
                    <div className={`grid h-9 w-9 place-items-center rounded-md ${a.cor}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{a.nome}</div>
                      <div className="text-[11px] text-foreground/45">{a.tipo} · {a.data}</div>
                    </div>
                    <button aria-label="Remover" className="grid h-7 w-7 place-items-center rounded-md text-foreground/40 hover:bg-accent/10 hover:text-accent">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Notas */}
          <div className="rf-card p-6">
            <header className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-medium uppercase tracking-widest text-foreground/40">Notas e anotações</h3>
                <p className="mt-1 text-xs text-foreground/55">Resumos rápidos, insights e pontos-chave.</p>
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground/70 hover:bg-surface-2">
                <Plus className="h-3.5 w-3.5" /> Nova nota
              </button>
            </header>

            <textarea rows={3} placeholder="Escreva uma nova anotação…" className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />

            <ul className="mt-4 space-y-3">
              {NOTAS.map((n) => (
                <li key={n.titulo} className="rounded-xl border border-border bg-background/40 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">{n.titulo}</h4>
                    <span className="text-[11px] text-foreground/40">{n.data}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-foreground/65">{n.body}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Flashcards do tópico */}
          <div className="rf-card p-6">
            <header className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-medium uppercase tracking-widest text-foreground/40">Flashcards do tópico</h3>
                <p className="mt-1 text-xs text-foreground/55">Cards vinculados a este tópico.</p>
              </div>
              <Link to="/flashcards/baralho/$id/novo-flashcard" params={{ id: "1" }} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
                <Plus className="h-3.5 w-3.5" /> Novo card
              </Link>
            </header>
            <ul className="space-y-2">
              {CARDS.map((c, i) => (
                <li key={i} className="flex items-center gap-3 rounded-lg border border-border bg-background/40 p-3">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{c.q}</div>
                    <div className="text-[11px] text-foreground/45">{c.maturidade} · próxima revisão {c.proxima}</div>
                  </div>
                  <Link to="/flashcards/flashcard/$id/editar" params={{ id: String(i + 1) }} className="grid h-7 w-7 place-items-center rounded-md text-foreground/40 hover:bg-primary/10 hover:text-primary">
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div className="rf-card p-5">
            <header className="mb-3 text-xs font-medium uppercase tracking-widest text-foreground/40">Progresso</header>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-semibold tabular-nums">92%</span>
              <span className="text-xs text-foreground/50">dominado</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: "92%" }} />
            </div>
            <ul className="mt-4 space-y-2 text-xs">
              <Row k="Última revisão" v="hoje, 09:12" />
              <Row k="Próxima revisão" v="em 3 dias" />
              <Row k="Acertos no tópico" v="86%" />
            </ul>
          </div>

          <div className="rf-card border-primary/20 bg-primary/5 p-5">
            <div className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-primary">
              <Sparkles className="h-3 w-3" /> Sugestão
            </div>
            <p className="text-xs leading-relaxed text-foreground/75">
              Gere flashcards automaticamente a partir do PDF “Aula 04 — Lesões fundamentais”.
            </p>
            <button className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
              <Sparkles className="h-3.5 w-3.5" /> Gerar com IA
            </button>
          </div>
        </aside>
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

function Row({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0 last:pb-0">
      <span className="text-foreground/50">{k}</span>
      <span className="font-medium text-foreground/85">{v}</span>
    </li>
  );
}
