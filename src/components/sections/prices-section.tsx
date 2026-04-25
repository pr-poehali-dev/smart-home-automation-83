import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"

const prices = [
  {
    category: "Стиральные машины",
    items: [
      { name: "Замена подшипника", price: "от 2 500 ₽" },
      { name: "Замена ТЭНа", price: "от 1 800 ₽" },
      { name: "Замена помпы/насоса", price: "от 1 500 ₽" },
      { name: "Ремонт электроники", price: "от 2 000 ₽" },
    ],
    direction: "left",
  },
  {
    category: "Холодильники",
    items: [
      { name: "Заправка фреона", price: "от 2 000 ₽" },
      { name: "Замена компрессора", price: "от 4 500 ₽" },
      { name: "Замена термостата", price: "от 1 200 ₽" },
      { name: "Устранение утечки", price: "от 1 800 ₽" },
    ],
    direction: "right",
  },
  {
    category: "Плиты и духовки",
    items: [
      { name: "Замена конфорки", price: "от 1 000 ₽" },
      { name: "Ремонт поджига", price: "от 800 ₽" },
      { name: "Замена терморегулятора", price: "от 1 500 ₽" },
      { name: "Ремонт электроники", price: "от 1 800 ₽" },
    ],
    direction: "left",
  },
]

export function PricesSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.2)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Цены
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Стоимость ремонта</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {prices.map((block, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-sm transition-all duration-700 md:p-6 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <h3 className="mb-4 font-sans text-lg font-semibold text-foreground md:text-xl">
                {block.category}
              </h3>
              <ul className="space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-center justify-between border-b border-foreground/10 pb-2 last:border-0 last:pb-0">
                    <span className="text-sm text-foreground/80">{item.name}</span>
                    <span className="font-mono text-sm font-semibold text-foreground">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className={`mt-6 transition-all duration-700 md:mt-10 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <p className="mb-4 font-mono text-xs text-foreground/50">
            * Точная стоимость определяется после диагностики. Диагностика — бесплатно при выполнении ремонта.
          </p>
          <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection?.(5)}>
            Вызвать мастера
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
