// @ts-nocheck
import Container from "@/components/atoms/container"

export default function DemoArticle({ title }) {
  const introText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate."

  const outroText =
    "Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  const sections = [
    { id: "demo-1", withTrigger: true },
    { id: "demo-2", withTrigger: false },
    { id: "demo-3", withTrigger: true },
    { id: "demo-4", withTrigger: true },
    { id: "demo-5", withTrigger: true },
    { id: "demo-6", withTrigger: false },
    { id: "demo-7", withTrigger: false },
  ]

  return (
    <Container>
      <article>
        <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl mb-4">
          {title}
        </h1>

        <div className="content max-w-3xl mb-4 space-y-5">
          {sections.map((section) => (
            <section key={section.id} className="space-y-4">
              <h2>Some example content</h2>
              <p>{introText}</p>
              {section.withTrigger ? (
                <p
                  data-scroll
                  data-scroll-repeat
                  data-scroll-call="trigger"
                  className="trigger"
                >
                  {outroText}
                </p>
              ) : (
                <p>{outroText}</p>
              )}
              <p>{outroText}</p>
            </section>
          ))}
        </div>
      </article>
    </Container>
  )
}
