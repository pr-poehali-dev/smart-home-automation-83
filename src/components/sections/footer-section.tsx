import { useState } from "react"

export function FooterSection() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setStatus("sending")
    try {
      await fetch("https://functions.poehali.dev/71c36ed5-0ba6-44e2-bed1-a86051d4db69", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.phone,
          message: form.message || "Заявка с подвала сайта",
        }),
      })
      setStatus("sent")
      setForm({ name: "", phone: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  return (
    <footer className="bg-[#1a3a6b]">
      {/* Основной блок */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">

          {/* Колонка 1: логотип + описание */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                <span className="font-sans text-2xl font-bold text-white">М</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-sans text-lg font-extrabold text-white">
                  НАШ <span className="text-[#e87722]">МАСТЕР</span>
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-white/50">
                  — техника в надёжных руках —
                </span>
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-white/60">
              Профессиональный ремонт бытовой техники с выездом на дом. Работаем с 2014 года, гарантия на все работы 1 год.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+79105587949"
                className="flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#e87722]"
              >
                <span className="text-[#e87722]">📞</span> +7 (910) 558-79-49
              </a>
              <p className="flex items-center gap-2 text-sm text-white/60">
                <span>🕐</span> Ежедневно с 8:00 до 21:00
              </p>
            </div>
          </div>

          {/* Колонка 2: ссылки */}
          <div>
            <h4 className="mb-5 font-sans text-sm font-bold uppercase tracking-widest text-white/40">
              Услуги
            </h4>
            <ul className="space-y-2.5">
              {[
                "Ремонт стиральных машин",
                "Ремонт холодильников",
                "Ремонт плит и духовок",
                "Ремонт посудомоечных машин",
                "Ремонт сушильных машин",
              ].map((s) => (
                <li key={s}>
                  <span className="text-sm text-white/70 transition-colors hover:text-white cursor-default">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 3: форма */}
          <div>
            <h4 className="mb-5 font-sans text-sm font-bold uppercase tracking-widest text-white/40">
              Оставить заявку
            </h4>
            {status === "sent" ? (
              <div className="rounded-xl bg-white/10 px-5 py-6 text-center">
                <p className="text-2xl">✅</p>
                <p className="mt-2 font-semibold text-white">Заявка принята!</p>
                <p className="mt-1 text-sm text-white/60">Мастер перезвонит в течение 15 минут</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-xs text-white/40 underline"
                >
                  Отправить ещё
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/20 transition focus:ring-[#e87722]"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/20 transition focus:ring-[#e87722]"
                />
                <textarea
                  placeholder="Что сломалось? (необязательно)"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full resize-none rounded-lg bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/20 transition focus:ring-[#e87722]"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-full bg-[#e87722] py-3 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-[#d06a1a] disabled:opacity-60 active:scale-95"
                >
                  {status === "sending" ? "Отправляем..." : "Вызвать мастера"}
                </button>
                {status === "error" && (
                  <p className="text-center text-xs text-red-400">Ошибка. Позвоните нам напрямую.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Нижняя полоска */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-center md:flex-row md:px-10">
          <p className="text-xs text-white/30">© {new Date().getFullYear()} НАШ МАСТЕР. Все права защищены.</p>
          <p className="text-xs text-white/30">Ремонт бытовой техники на дому</p>
        </div>
      </div>
    </footer>
  )
}
