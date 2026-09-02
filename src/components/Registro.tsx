import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fbwpnfezfkdqnvwyufor.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZid3BuZmV6ZmtkcW52d3l1Zm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMDg2NDEsImV4cCI6MjA5Nzc4NDY0MX0.RAw8IohqbXWFVplmds5hC2IcI8qjYJ9oDNORS6M9FGM"
);

type State = "idle" | "loading" | "success" | "duplicate" | "error";

export default function Registro() {
  const [email, setEmail]           = useState("");
  const [state, setState]           = useState<State>("idle");
  const [shareCode, setShareCode]   = useState<string | null>(null);
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [copied, setCopied]         = useState(false);
  const fakeCount                   = useRef(0);

  useEffect(() => {
    fakeCount.current = Math.floor(Math.random() * 5001) + 1000;
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) setReferredBy(ref);
  }, []);

  const shareUrl = shareCode
    ? `https://senseiherb.com?ref=${shareCode}`
    : "https://senseiherb.com";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");

    const code = crypto.randomUUID();

    const { error } = await supabase.from("preregistros").insert({
      email:       email.trim().toLowerCase(),
      share_code:  code,
      referred_by: referredBy,
    });

    if (error) {
      setState(error.code === "23505" ? "duplicate" : "error");
      return;
    }

    setShareCode(code);
    setState("success");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  }

  const msgEncoded = encodeURIComponent(
    "Acabo de reservar mi plaza en SenseiHerb — la guía de cannabis con IA para España. Si llegamos a 10.000, los que compartan tienen el primer mes gratis 👉 "
  );

  // ─── SUCCESS ──────────────────────────────────────────────────────────────
  if (state === "success" && shareCode) {
    return (
      <section id="registro" className="py-24 px-5">
        <div className="max-w-xl mx-auto text-center">

          <div className="flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-6 bg-dojo-green/15 border border-dojo-green/30">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>

          <h2 className="font-display font-black text-3xl text-white mb-3">
            ¡Ya estás en la lista!
          </h2>
          <p className="text-dojo-muted mb-8 leading-relaxed">
            Te avisaremos cuando abramos. Revisa tu email — te hemos enviado tu enlace personal.
          </p>

          {/* Counter */}
          <div className="mb-10 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-dojo-surface border border-dojo-border">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dojo-green opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-dojo-green"></span>
            </span>
            <span className="text-sm font-semibold text-white">
              {(fakeCount.current + 1).toLocaleString("es-ES")} personas ya apuntadas
            </span>
            <span className="text-xs text-dojo-muted">· meta: 10.000</span>
          </div>

          {/* Share card */}
          <div className="rounded-3xl border border-dojo-green/20 bg-dojo-surface p-7 text-left">
            <p className="text-xs font-bold tracking-[.22em] uppercase text-dojo-gold mb-2">
              Oferta de lanzamiento
            </p>
            <h3 className="font-display font-black text-xl text-white mb-2 leading-tight">
              Si llegamos a 10.000, los que compartan tienen el primer mes de{" "}
              <span className="text-dojo-green">Cultivador gratis</span>
            </h3>
            <p className="text-sm text-dojo-muted mb-6 leading-relaxed">
              Sin tarjeta. Sin trampa. Comparte tu enlace personal y si alcanzamos el objetivo antes del lanzamiento, te lo aplicamos automáticamente.
            </p>

            {/* Copy link row */}
            <div className="flex items-center gap-2 bg-dojo-card rounded-xl px-4 py-3 mb-4 border border-dojo-border">
              <span className="text-xs text-dojo-muted truncate flex-1 font-mono">
                senseiherb.com?ref={shareCode.slice(0, 8)}…
              </span>
              <button
                onClick={copyLink}
                className="text-xs font-semibold text-dojo-green whitespace-nowrap flex items-center gap-1.5 transition hover:text-white"
              >
                {copied ? (
                  <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>Copiado</>
                ) : (
                  <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copiar</>
                )}
              </button>
            </div>

            {/* Share buttons */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href={`https://wa.me/?text=${msgEncoded}${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 h-11 rounded-xl font-semibold text-sm text-white transition hover:opacity-80 active:scale-95"
                style={{ background: "#25d366" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12.05 2.003a9.952 9.952 0 0 0-8.504 15.13L2 22l4.984-1.31a9.953 9.953 0 0 0 4.772 1.215h.004C17.24 21.905 22 17.144 22 11.234c0-2.656-1.033-5.153-2.908-7.03A9.923 9.923 0 0 0 12.05 2zm0 18.26h-.003a8.26 8.26 0 0 1-4.208-1.15l-.302-.179-3.13.821.836-3.053-.197-.313a8.267 8.267 0 0 1-1.269-4.39c0-4.563 3.715-8.277 8.28-8.277a8.22 8.22 0 0 1 5.851 2.424 8.222 8.222 0 0 1 2.42 5.858c-.002 4.564-3.716 8.259-8.278 8.259z"/>
                </svg>
                WhatsApp
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${msgEncoded}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 h-11 rounded-xl font-semibold text-sm text-white bg-black border border-white/10 transition hover:opacity-80 active:scale-95"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.733-8.835L1.254 2.25H8.08l4.256 5.63 5.908-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Twitter / X
              </a>

              <button
                onClick={copyLink}
                className="flex items-center justify-center gap-2 h-11 rounded-xl font-semibold text-sm text-white bg-dojo-card border border-dojo-border transition hover:border-dojo-green/40 active:scale-95"
              >
                {copied ? (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>Copiado</>
                ) : (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copiar</>
                )}
              </button>
            </div>
          </div>

          <p className="mt-6 text-xs text-dojo-muted/40">
            +18 · Solo uso informativo · Contenido educativo
          </p>
        </div>
      </section>
    );
  }

  // ─── FORM ─────────────────────────────────────────────────────────────────
  return (
    <section id="registro" className="py-24 px-5">
      <div className="max-w-xl mx-auto text-center">

        {/* Counter */}
        <div className="mb-8 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-dojo-surface border border-dojo-border">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dojo-green opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-dojo-green"></span>
          </span>
          <span className="text-sm font-semibold text-white">
            {fakeCount.current > 0
              ? `${fakeCount.current.toLocaleString("es-ES")} personas ya apuntadas`
              : "Únete a los primeros"}
          </span>
          <span className="text-xs text-dojo-muted">· meta: 10.000</span>
        </div>

        <p className="text-dojo-green text-xs font-semibold tracking-[0.25em] uppercase mb-3">
          Acceso anticipado
        </p>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white mb-4">
          Sé el <span className="text-dojo-green">primero</span>
        </h2>
        <p className="text-dojo-muted mb-3 max-w-sm mx-auto leading-relaxed">
          Apúntate al lanzamiento. Te avisamos en cuanto abramos.
        </p>
        <p className="text-sm text-dojo-gold font-semibold mb-8">
          🎁 Si llegamos a 10.000 y has compartido → primer mes de Cultivador gratis
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@email.com"
            disabled={state === "loading"}
            className="flex-1 h-13 px-5 rounded-2xl bg-dojo-surface border border-dojo-border text-white placeholder:text-dojo-muted/50 focus:outline-none focus:border-dojo-green/50 transition disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="h-13 px-7 rounded-2xl font-semibold text-white whitespace-nowrap transition hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dojo-green focus-visible:outline-offset-2"
            style={{ background: "linear-gradient(135deg,#34d399,#059669)" }}
          >
            {state === "loading" ? (
              <svg className="animate-spin mx-auto" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
              </svg>
            ) : "Apuntarme →"}
          </button>
        </form>

        {state === "duplicate" && (
          <p className="mt-4 text-sm text-dojo-gold">
            ✓ Ese email ya está apuntado. ¡Gracias por el interés!
          </p>
        )}
        {state === "error" && (
          <p className="mt-4 text-sm text-red-400">
            Algo fue mal. Inténtalo de nuevo.
          </p>
        )}

        <p className="mt-5 text-xs text-dojo-muted/40">
          Sin spam · Sin tarjeta · +18 · Solo uso informativo
        </p>
      </div>
    </section>
  );
}
