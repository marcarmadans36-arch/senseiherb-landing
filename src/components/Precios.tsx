import { useState } from "react";

const PLANS = [
  {
    id:          "aprendiz",
    name:        "Aprendiz",
    emoji:       "🌱",
    desc:        "Para empezar a explorar",
    monthly:     0,
    annual:      0,
    cta:         "Empezar gratis",
    highlighted: false,
    features: [
      "Catálogo básico de variedades",
      "Recomendador por mood (5/día)",
      "Localizador de clubs",
      "Fichas informativas",
    ],
    missing: [
      "Sensei IA ilimitado",
      "Análisis de fotos",
    ],
  },
  {
    id:          "cultivador",
    name:        "Cultivador",
    emoji:       "🌿",
    desc:        "Para el entusiasta comprometido",
    monthly:     4.99,
    annual:      44.88,
    cta:         "Elegir Cultivador",
    highlighted: false,
    features: [
      "Todo lo de Aprendiz",
      "Catálogo completo sin límites",
      "Recomendador ilimitado",
      "50 análisis de fotos al mes",
      "Historial y favoritos",
    ],
    missing: [
      "Sensei IA ilimitado",
    ],
  },
  {
    id:          "maestro",
    name:        "Maestro",
    emoji:       "🏯",
    desc:        "Conocimiento sin límites",
    monthly:     9.99,
    annual:      89.88,
    cta:         "Elegir Maestro",
    highlighted: true,
    features: [
      "Todo lo de Cultivador",
      "Chat ilimitado con el Sensei IA",
      "300 mensajes/mes con respuestas premium",
      "Análisis avanzado de fotos",
      "Acceso prioritario a nuevas funciones",
    ],
    missing: [],
  },
] as const;

export default function Precios() {
  const [annual, setAnnual] = useState(false);
  const fmt = (n: number) => n.toFixed(2).replace(".", ",");

  return (
    <section className="py-24 px-5" aria-labelledby="precios-title">
      <div className="max-w-5xl mx-auto">

        {/* Encabezado */}
        <div className="text-center mb-12">
          <p className="text-dojo-gold text-xs font-semibold tracking-[0.25em] uppercase mb-3">Planes</p>
          <h2 id="precios-title" className="font-display font-black text-3xl md:text-5xl text-white">
            Elige tu <span className="text-dojo-green">nivel</span>
          </h2>
          <p className="mt-4 text-dojo-muted max-w-sm mx-auto">
            Empieza gratis y sube de cinturón cuando quieras.
          </p>

          {/* Toggle mensual / anual */}
          <div className="inline-flex items-center gap-3 mt-8 p-1 rounded-2xl bg-dojo-surface border border-dojo-border">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${!annual ? "bg-white/10 text-white" : "text-dojo-muted hover:text-white"}`}
              aria-pressed={!annual}
            >
              Mensual
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${annual ? "bg-white/10 text-white" : "text-dojo-muted hover:text-white"}`}
              aria-pressed={annual}
            >
              Anual
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-dojo-green/20 text-dojo-green border border-dojo-green/30">
                −25%
              </span>
            </button>
          </div>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => {
            const price = annual ? plan.annual : plan.monthly;
            const isFree = price === 0;

            return (
              <article
                key={plan.id}
                className={`relative flex flex-col rounded-3xl border p-7 shadow-card transition-all ${
                  plan.highlighted
                    ? "border-dojo-green/50 bg-dojo-surface shadow-green scale-[1.02]"
                    : "border-dojo-border bg-dojo-surface"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-grad-green text-white shadow-green">
                      ⭐ Recomendado
                    </span>
                  </div>
                )}

                {/* Cabecera */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl" role="img" aria-label={plan.name}>{plan.emoji}</span>
                    <h3 className="font-display font-bold text-xl text-white">{plan.name}</h3>
                  </div>
                  <p className="text-sm text-dojo-muted">{plan.desc}</p>
                </div>

                {/* Precio */}
                <div className="mb-7">
                  {isFree ? (
                    <p className="font-display font-black text-4xl text-white">Gratis</p>
                  ) : annual ? (
                    <div className="flex items-end gap-1">
                      <span className="font-display font-black text-4xl text-white">
                        {fmt(plan.annual)}€
                      </span>
                      <span className="text-dojo-muted text-sm mb-1">/año</span>
                    </div>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="font-display font-black text-4xl text-white">
                        {fmt(plan.monthly)}€
                      </span>
                      <span className="text-dojo-muted text-sm mb-1">/mes</span>
                    </div>
                  )}
                  {!isFree && annual && (
                    <p className="text-xs text-dojo-green mt-1">
                      Ahorras {fmt(plan.monthly * 12 - plan.annual)}€ respecto al plan mensual
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <span className="w-4 h-4 rounded-full bg-dojo-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M2 6l3 3 5-5" />
                        </svg>
                      </span>
                      <span className="text-dojo-muted">{f}</span>
                    </li>
                  ))}
                  {plan.missing.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm opacity-35">
                      <span className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M3 3l6 6M9 3l-6 6" />
                        </svg>
                      </span>
                      <span className="text-dojo-muted line-through">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#registro"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center h-12 rounded-2xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dojo-green focus-visible:outline-offset-2 ${
                    plan.highlighted
                      ? "bg-grad-green text-white shadow-green"
                      : "bg-white/5 border border-dojo-border text-white hover:bg-white/10"
                  }`}
                >
                  {plan.cta}
                </a>
              </article>
            );
          })}
        </div>

        <p className="text-center text-xs text-dojo-muted/50 mt-8">
          Precios en euros · IVA incluido · Cancela cuando quieras
        </p>
      </div>
    </section>
  );
}
