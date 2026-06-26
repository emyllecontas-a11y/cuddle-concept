import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ChevronLeft, Upload, FileText, ImageIcon, FileSpreadsheet, Trash2 } from "lucide-react";

export const Route = createFileRoute("/conteudo/disciplina/$nome/novo-topico")({
  head: () => ({ meta: [{ title: "Novo tópico — RevisaFlash" }] }),
  component: NovoTopicoPage,
});

const ANEXOS = [
  { nome: "Aula 04 — Lesões fundamentais.pdf", tipo: "PDF · 3.4 MB", icon: FileText, cor: "text-accent bg-accent/10" },
  { nome: "Esquema-mapa mental.png", tipo: "Imagem · 1.1 MB", icon: ImageIcon, cor: "text-primary bg-primary/10" },
  { nome: "Resumo do capítulo 7.docx", tipo: "DOCX · 540 KB", icon: FileText, cor: "text-warning bg-warning/15" },
  { nome: "Tabela diferencial.xlsx", tipo: "XLSX · 220 KB", icon: FileSpreadsheet, cor: "text-primary bg-primary/10" },
];

function NovoTopicoPage() {
  const { nome } = Route.useParams();

  return (
    <AppShell breadcrumb="Conteúdo · Novo tópico" title="Criar novo tópico">
      <Link to="/conteudo/disciplina/$nome" params={{ nome }} className="-mt-2 mb-6 inline-flex items-center gap-1 text-xs font-medium text-foreground/55 hover:text-foreground">
        <ChevronLeft className="h-3.5 w-3.5" /> Voltar à disciplina
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="space-y-5 lg:col-span-2">
          <div className="rf-card p-6">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-foreground/40">Informações</h3>
            <div className="space-y-4">
              <Field label="Nome do tópico">
                <input defaultValue="Lesões fundamentais" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </Field>
              <Field label="Descrição" hint="Resumo do que esse tópico aborda.">
                <textarea rows={4} defaultValue="Classificação morfológica das lesões elementares: mácula, pápula, vesícula, bolha, úlcera e nódulo. Inclui características clínicas e diagnóstico diferencial." className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Ordem na disciplina">
                  <input type="number" defaultValue="1" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
                </Field>
                <Field label="Prioridade">
                  <select className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
                    <option>Alta — cai todo ano</option>
                    <option>Média</option>
                    <option>Baixa</option>
                  </select>
                </Field>
              </div>
            </div>
          </div>

          <div className="rf-card p-6">
            <header className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-medium uppercase tracking-widest text-foreground/40">Materiais</h3>
                <p className="mt-1 text-xs text-foreground/55">Anexe PDFs, imagens, planilhas ou áudios relacionados.</p>
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
                <Upload className="h-3.5 w-3.5" /> Enviar arquivo
              </button>
            </header>

            <button className="grid w-full place-items-center gap-2 rounded-xl border border-dashed border-border bg-surface/30 px-6 py-10 text-xs text-foreground/55 transition-colors hover:border-primary/50 hover:text-primary">
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
                      <div className="text-[11px] text-foreground/45">{a.tipo}</div>
                    </div>
                    <button aria-label="Remover" className="grid h-7 w-7 place-items-center rounded-md text-foreground/40 hover:bg-accent/10 hover:text-accent">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <aside className="rf-card p-6 lg:sticky lg:top-20 lg:self-start">
          <header className="mb-4 text-[10px] font-medium uppercase tracking-widest text-foreground/40">Pré-visualização</header>
          <article className="rf-card p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 font-display text-sm font-semibold text-primary tabular-nums">1</div>
              <div>
                <div className="text-sm font-semibold">Lesões fundamentais</div>
                <div className="text-[11px] text-foreground/45">{ANEXOS.length} materiais · 0 cards</div>
              </div>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-0 rounded-full bg-primary" />
            </div>
          </article>
          <p className="mt-4 text-xs text-foreground/55">
            Após criar o tópico, você poderá gerar flashcards a partir dos materiais.
          </p>
        </aside>
      </div>

      <footer className="mt-8 flex items-center justify-end gap-2">
        <Link to="/conteudo/disciplina/$nome" params={{ nome }} className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/65 hover:bg-white/5">Cancelar</Link>
        <button className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Criar tópico</button>
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
