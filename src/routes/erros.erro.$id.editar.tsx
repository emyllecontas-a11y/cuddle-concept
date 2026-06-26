import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ChevronLeft, AlertTriangle, Trash2, History, Tag } from "lucide-react";

export const Route = createFileRoute("/erros/erro/$id/editar")({
  head: () => ({ meta: [{ title: "Editar erro — RevisaFlash" }] }),
  component: EditarErroPage,
});

function EditarErroPage() {
  return (
    <AppShell breadcrumb="Erros · Editar erro" title="Editar erro">
      <Link to="/erros" className="-mt-2 mb-6 inline-flex items-center gap-1 text-xs font-medium text-foreground/55 hover:text-foreground">
        <ChevronLeft className="h-3.5 w-3.5" /> Voltar para Erros
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="space-y-5 lg:col-span-2">
          <div className="rf-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xs font-medium uppercase tracking-widest text-foreground/40">Questão</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                <AlertTriangle className="h-3 w-3" /> ×3 reincidências
              </span>
            </div>
            <div className="space-y-4">
              <Field label="Enunciado">
                <textarea rows={4} defaultValue="Sobre o líquen plano oral, qual variante apresenta MAIOR risco de transformação maligna?" className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </Field>
              <Field label="Resposta correta">
                <input defaultValue="Erosivo/atrófico" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </Field>
              <Field label="Sua resposta na época">
                <input defaultValue="Reticular" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </Field>
              <Field label="Comentário / Justificativa" hint="O que aprendi com esse erro.">
                <textarea rows={4} defaultValue="Variantes erosivas e atróficas têm maior potencial de malignização (~1–3%). Reticular é a forma mais comum, mas com risco baixo. Revisar critérios da OMS." className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </Field>
            </div>
          </div>

          <div className="rf-card p-6">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-foreground/40">Classificação</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Disciplina">
                <select className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
                  <option>Patologia Oral</option>
                  <option>Periodontia</option>
                  <option>Cirurgia BMF</option>
                </select>
              </Field>
              <Field label="Tópico">
                <input defaultValue="Lesões brancas" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </Field>
              <Field label="Tipo de erro">
                <select className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
                  <option>Conceito</option>
                  <option>Interpretação</option>
                  <option>Memória</option>
                  <option>Atenção</option>
                </select>
              </Field>
              <Field label="Origem">
                <input defaultValue="ENARE 2024 — Questão 47" className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
              </Field>
            </div>

            <div className="mt-4">
              <span className="mb-2 block text-xs font-medium text-foreground/70">Tags</span>
              <div className="flex flex-wrap gap-2">
                {["líquen plano", "lesões brancas", "malignização", "OMS"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] text-foreground/70">
                    <Tag className="h-3 w-3 text-foreground/40" /> {t}
                  </span>
                ))}
                <button className="rounded-full border border-dashed border-border px-2.5 py-1 text-[11px] text-foreground/45 hover:border-primary/50 hover:text-primary">+ adicionar</button>
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rf-card p-5">
            <header className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-foreground/40">
              <History className="h-3 w-3 text-primary" /> Histórico
            </header>
            <ul className="space-y-3 text-xs">
              <Hist data="23/06/2026" status="errou" obs="Marcou 'Reticular'" />
              <Hist data="08/05/2026" status="errou" obs="Marcou 'Hipertrófico'" />
              <Hist data="14/03/2026" status="errou" obs="Em branco" />
              <Hist data="02/02/2026" status="acertou" obs="Revisão flashcard" />
            </ul>
          </div>

          <div className="rf-card p-5">
            <header className="mb-3 text-xs font-medium uppercase tracking-widest text-foreground/40">Status</header>
            <select className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
              <option>Ativo — revisar</option>
              <option>Resolvido</option>
              <option>Arquivado</option>
            </select>
            <p className="mt-3 text-[11px] text-foreground/50">Marque como resolvido após 2 acertos consecutivos.</p>
          </div>

          <button className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-accent/40 bg-accent/5 px-3 py-2 text-xs font-semibold text-accent hover:bg-accent/10">
            <Trash2 className="h-3.5 w-3.5" /> Excluir erro
          </button>
        </aside>
      </div>

      <footer className="mt-8 flex items-center justify-end gap-2">
        <Link to="/erros" className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/65 hover:bg-white/5">Cancelar</Link>
        <button className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">Salvar alterações</button>
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

function Hist({ data, status, obs }: { data: string; status: "acertou" | "errou"; obs: string }) {
  const ok = status === "acertou";
  return (
    <li className="flex items-start gap-2 border-b border-border/60 pb-2 last:border-0 last:pb-0">
      <span className={["mt-1 h-1.5 w-1.5 shrink-0 rounded-full", ok ? "bg-primary" : "bg-accent"].join(" ")} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground/80">{data}</span>
          <span className={["text-[10px] font-medium uppercase tracking-widest", ok ? "text-primary" : "text-accent"].join(" ")}>{status}</span>
        </div>
        <div className="text-[11px] text-foreground/50">{obs}</div>
      </div>
    </li>
  );
}
