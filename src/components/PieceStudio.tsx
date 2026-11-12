import { useEffect, useRef, useState } from "react";
import { ProductImage, RouteLink, Arrow } from "./FinalShared";

export default function PieceStudio({
  slug,
  cover,
}: {
  slug: string;
  cover: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const controls = useRef<{
    rotate: (v: number) => void;
    reset: () => void;
    pause: (v: boolean) => void;
  } | null>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const initialPaused = useRef(paused);

  useEffect(() => {
    if (!active || !host.current) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    import("../piece-renderer")
      .then(({ createPieceRenderer }) => {
        if (cancelled || !host.current) return;
        const renderer = createPieceRenderer(
          host.current,
          slug,
          initialPaused.current,
        );
        controls.current = renderer;
        dispose = renderer.dispose;
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
      dispose?.();
      controls.current = null;
    };
  }, [active, slug]);

  return (
    <section
      className="p-studio f-container"
      aria-label="Estúdio interativo da peça"
    >
      <div className="p-studio-copy">
        <span className="p-overline">FORMA / SUPERFÍCIE / REFLEXO</span>
        <h2>
          Outro ângulo.
          <br />
          <em>O mesmo detalhe.</em>
        </h2>
        <p>Explore a forma e observe como a luz percorre o metal.</p>
        <small>
          Representação 3D ilustrativa. As fotografias abaixo mostram as peças
          reais; formatos e medidas variam conforme o pedido.
        </small>
        <RouteLink to={`contato?peca=${slug}`} className="f-text-link">
          Consultar minha peça <Arrow />
        </RouteLink>
      </div>
      <div className="p-stage">
        <span className="p-stage-label">PRIMOS — ESTUDO DE SUPERFÍCIE</span>
        {(!ready || failed) && (
          <div className="p-studio-poster">
            <ProductImage id={cover} />
            <button
              disabled={active}
              onClick={() => {
                setFailed(false);
                setActive(true);
              }}
            >
              {failed
                ? "Visualização indisponível neste dispositivo"
                : active
                  ? "Preparando a peça…"
                  : "Explorar peça em 3D ↗"}
            </button>
          </div>
        )}
        <div
          ref={host}
          className="p-canvas"
          aria-label="Modelo tridimensional. Use os botões para girar ou arraste horizontalmente."
          role="img"
        />
        {ready && !failed && (
          <div className="p-studio-controls">
            <span>ARRASTE PARA GIRAR</span>
            <div>
              <button
                aria-label="Girar peça à esquerda"
                onClick={() => controls.current?.rotate(-0.35)}
              >
                ←
              </button>
              <button
                onClick={() => {
                  controls.current?.pause(!paused);
                  setPaused(!paused);
                }}
              >
                {paused ? "Animar" : "Pausar"}
              </button>
              <button
                aria-label="Girar peça à direita"
                onClick={() => controls.current?.rotate(0.35)}
              >
                →
              </button>
              <button onClick={() => controls.current?.reset()}>
                Reiniciar
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
