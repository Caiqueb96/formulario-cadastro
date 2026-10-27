// Fundo feito só com CSS: nenhuma imagem para baixar.
// São três camadas empilhadas, fixas atrás de todo o conteúdo (-z-10).
export function FundoDecorativo() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* 1. Brilhos: círculos coloridos com desfoque forte, parecem luz difusa */}
      <div className="absolute -top-48 -left-32 size-[36rem] rounded-full bg-violet-600/25 blur-[120px]" />
      <div className="absolute -right-40 -bottom-56 size-[40rem] rounded-full bg-cyan-500/15 blur-[120px]" />

      {/* 2. Grade: dois gradientes de 1px (um vertical, um horizontal) repetidos a cada 48px.
             A máscara radial deixa a grade visível no centro e some nas bordas */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255 255 255 / 0.04) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgb(255 255 255 / 0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* 3. Vinheta: escurece levemente as bordas e foca o olhar no centro */}
      <div className="absolute inset-0 bg-radial from-transparent from-40% to-black/60" />
    </div>
  )
}
