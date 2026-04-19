import Image from "next/image";

export default function AboutPage() {
  return (
    <main>
      <section className="bg-primary-dark px-5 pb-16 pt-32 text-accent md:px-8 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="font-display text-[2.25rem] font-light uppercase tracking-[0.18em] md:text-7xl md:tracking-[0.28em]">
            ABOUT SAUDADE
          </h1>
        </div>
      </section>

      <section className="relative overflow-hidden bg-bg-light py-20">
        <div className="relative mx-auto grid max-w-6xl gap-8 px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative overflow-hidden rounded-[1.7rem] border border-primary-light/15">
            <Image
              src="/wp-content/uploads/2024/10/Copia-de-20180203_143657.jpg"
              alt="Mayka in nature"
              width={1000}
              height={1200}
              priority
              className="h-[300px] w-full object-cover sm:h-[420px] lg:h-full"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
          <article className="max-w-2xl">
            <p className="luxury-label text-[10px] text-accent-muted">
              Welcome to Saudade
            </p>
            <h2 className="mt-4 font-heading text-4xl font-light leading-tight text-text-on-light md:text-5xl">
              Saudade is a movement.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-text-on-light/85">
              Saudade is not only a sustainable fashion brand dedicated to
              elevate the spirit and inspire conscious living; Saudade is a
              movement.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-on-light/85">
              Saudade is a gathering of kindred spirits, united by a shared
              passion for celebrating life, making a meaningful impact, and
              inspiring others to live sustainably and consciously.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-primary py-20 text-accent">
        <div className="mx-auto max-w-5xl px-6 md:px-8">
          <p className="luxury-label text-[10px] text-accent-muted">
            What Does Saudade Mean
          </p>
          <h2 className="mt-4 font-heading text-4xl font-light md:text-5xl">
            A feeling, a sensation, a call for awareness.
          </h2>
            <p className="mt-6 text-base leading-relaxed text-accent/85">
            Saudade has no direct translation; it is more than a word. It is
            the deep longing for meaningful connection, the will to reach out,
            and the energy that bridges the distance between hearts.
          </p>
            <p className="mt-4 text-base leading-relaxed text-accent/85">
            It can be longing, nostalgia, love, even heartbreak - always
            profound and immensely powerful. Saudade is the aspiration for
            greatness and genuine connection with ourselves, nature, and the
            universe itself.
          </p>
            <p className="mt-4 text-base leading-relaxed text-accent/85">
            With love and joy, Mayka presents this vision: a future of
            integrity, tolerance, harmony, determination, and love.
          </p>
        </div>
      </section>

      <section className="bg-bg-alt py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="luxury-label text-[10px] text-accent-muted">Explore</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="overflow-hidden rounded-[1.4rem] border border-primary-light/20 bg-bg-light">
              <div className="relative h-56">
                <Image
                  src="/wp-content/uploads/2025/08/fest-1.jpg"
                  alt="High Frequency Fashion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-3xl font-light text-text-on-light">
                  High Frequency Fashion
                </h3>
              </div>
            </article>
            <article className="overflow-hidden rounded-[1.4rem] border border-primary-light/20 bg-bg-light">
              <div className="relative h-56">
                <Image
                  src="/wp-content/uploads/2024/10/adairatr1.jpg"
                  alt="International Community"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-3xl font-light text-text-on-light">
                  International Community
                </h3>
              </div>
            </article>
            <article className="overflow-hidden rounded-[1.4rem] border border-primary-light/20 bg-bg-light">
              <div className="relative h-56">
                <Image
                  src="/wp-content/uploads/2025/08/fest-1.jpg"
                  alt="Events"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-3xl font-light text-text-on-light">
                  Events
                </h3>
              </div>
            </article>
            <article className="overflow-hidden rounded-[1.4rem] border border-primary-light/20 bg-bg-light">
              <div className="relative h-56">
                <Image
                  src="/wp-content/uploads/2024/10/Copia-de-20180203_145549.jpg"
                  alt="Sustainable Development"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-3xl font-light text-text-on-light">
                  Sustainable Development
                </h3>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary-light py-20 text-accent">
        <div className="relative mx-auto grid max-w-6xl gap-8 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <article>
            <p className="luxury-label text-[10px] text-accent-muted">
              The Vision Of Saudade Land
            </p>
            <h2 className="mt-4 font-heading text-4xl font-light">
              A conscious living sanctuary and regenerative community.
            </h2>
            <p className="mt-6 leading-relaxed text-accent/85">
              The vision is to establish self-sustaining hubs across the world,
              starting in Brazil and eventually expanding to every continent.
            </p>
            <p className="mt-4 leading-relaxed text-accent/85">
              These sanctuaries become living examples where renewable energy,
              permaculture, and circular economies replace exploitation and
              waste.
            </p>
          </article>
          <div className="relative overflow-hidden rounded-[1.7rem] border border-accent/25">
            <Image
              src="/wp-content/uploads/2026/01/mateus-pontes-x2TDul-JMl8-unsplash-scaled.jpg"
              alt="Saudade Land vision in Brazil"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-primary-dark px-5 py-20 text-center text-accent md:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="font-heading text-3xl font-light leading-relaxed md:text-4xl">
            "The project is inspired by the need for positive change, unity,
            and transcendence into a new world."
          </p>
          <p className="mt-6 text-accent-muted">
            With love for nature and the cultures that brought us to this
            present moment.
          </p>
        </div>
      </section>
    </main>
  );
}
