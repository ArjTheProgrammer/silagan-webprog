import Button from "../components/Button.jsx";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <div className="h-28 w-28 rounded-full border-2 border-zinc-300 bg-zinc-100" />
            </div>
          </div> */}
          <img
            className="rounded-3xl border-2"
            src="	https://i.pinimg.com/avif/736x/4d/9e/29/4d9e29361d4dcdc6eabf5a0a035c900d.avf"
            alt="hero nav"
          />

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Section
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Discover the Future of Journaling with AI
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Our application revolutionizes journaling by integrating AI to
              provide insightful summaries of your entries and a smart chatbot
              buddy to support your mental health journey.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>

              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Profile Overview
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            AI-Powered Features at a Glance
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">AI Summaries</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Intelligent Insights
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">Chatbot Buddy</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Mental Health Support
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">
              Personalized Journals
            </p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Tailored Experience
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">Secure Storage</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Privacy First
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Section Flow
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
              Empowering Your Mental Wellness
            </h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  AI-Driven Summaries
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Get concise and meaningful summaries of your journal entries
                  to reflect on your thoughts and progress.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Smart Chatbot Buddy
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Engage with a supportive AI chatbot designed to help you
                  navigate your mental health journey.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Personal Growth
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Track your progress and celebrate milestones with personalized
                  insights and recommendations.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Visual Grid
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {/* <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
              </div> */}

              {/* <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
              </div>

              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
              </div>

              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
              </div> */}

              <img
                className="rounded-[1.25rem] h-48 w-full object-cover"
                src="https://i.pinimg.com/avif/736x/f5/1f/28/f51f28c222066c3fc644c05fc5822fff.avf"
                alt="image 1"
              />

              <img
                className="rounded-[1.25rem] h-48 w-full object-cover"
                src="https://i.pinimg.com/736x/ec/f7/8f/ecf78fc487893c8a8e3f92d71031d7bb.jpg"
                alt="image 2"
              />

              <img
                className="rounded-[1.25rem] h-48 w-full object-cover"
                src="https://i.pinimg.com/736x/95/e9/04/95e904c85eb1c73fe9978270b2c2fadc.jpg"
                alt="image 3"
              />

              <img
                className="rounded-[1.25rem] h-48 w-full object-cover"
                src="https://i.pinimg.com/736x/6d/56/d9/6d56d9bf0a6baff16a8f83cfec67f05b.jpg"
                alt="image 4"
              />
            </div>

            <Button className="mt-5">View Section</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
