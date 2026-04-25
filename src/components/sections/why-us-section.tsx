const advantages = [
  {
    icon: "🏆",
    title: "Опыт 10+ лет",
    desc: "Ремонтируем бытовую технику всех марок с 2014 года",
  },
  {
    icon: "⚡",
    title: "Выезд в день обращения",
    desc: "Мастер приедет в удобное для вас время, даже в выходные",
  },
  {
    icon: "🛡️",
    title: "Гарантия 1 год",
    desc: "На все виды работ и установленные запчасти",
  },
  {
    icon: "💰",
    title: "Честные цены",
    desc: "Диагностика бесплатно при выполнении ремонта. Без скрытых доплат",
  },
  {
    icon: "🔧",
    title: "Оригинальные запчасти",
    desc: "Используем только сертифицированные детали от проверенных поставщиков",
  },
  {
    icon: "📞",
    title: "Поддержка после ремонта",
    desc: "Консультируем по телефону и отвечаем на вопросы после выполнения работ",
  },
]

export function WhyUsSection({ onRequestClick }: { onRequestClick?: () => void }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-10">
        {/* Заголовок */}
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-2 font-mono text-sm font-medium uppercase tracking-widest text-[#e87722]">
            Наши преимущества
          </p>
          <h2 className="font-sans text-3xl font-bold text-[#1a3a6b] md:text-4xl lg:text-5xl">
            Почему выбирают нас
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#e87722]" />
        </div>

        {/* Карточки */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#e87722]/30 hover:shadow-lg md:p-8"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#1a3a6b]/5 text-3xl transition-all duration-300 group-hover:bg-[#e87722]/10">
                {item.icon}
              </div>
              <h3 className="mb-2 font-sans text-lg font-bold text-[#1a3a6b]">{item.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA-блок */}
        <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-[#1a3a6b] px-6 py-10 text-center md:mt-16 md:px-12">
          <h3 className="font-sans text-2xl font-bold text-white md:text-3xl">
            Готовы починить вашу технику?
          </h3>
          <p className="max-w-md text-sm text-white/70">
            Оставьте заявку — мастер перезвонит в течение 15 минут и согласует удобное время выезда
          </p>
          <button
            onClick={onRequestClick}
            className="mt-2 rounded-full bg-[#e87722] px-8 py-3.5 font-sans text-base font-semibold text-white transition-all duration-300 hover:bg-[#d06a1a] hover:shadow-lg active:scale-95"
          >
            Оставить заявку
          </button>
        </div>
      </div>
    </section>
  )
}
