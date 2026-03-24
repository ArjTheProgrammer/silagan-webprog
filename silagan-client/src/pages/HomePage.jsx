import Button from "../components/Buttons.jsx";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Welcome to Nilai!
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Your AI-powered journaling companion designed to help you reflect,
              grow, and maintain your mental well-being.
            </p>

            <div className="mt-6">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <img
              className="w-auto h-50 rounded-[1.25rem]"
              src="https://github.com/ArjTheProgrammer/nilai-frontend/blob/main/src/assets/nilai.png?raw=true"
              alt="nilai banner"
            />
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Journaling Insights at a Glance
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">15</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Journals Summarized
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">10</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Chatbot Conversations
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">7</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Reflection Prompts
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">5</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Wellness Goals Achieved
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Explore Our Features
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            {/* <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
            </div> */}
            <img
              className="rounded-2xl flex aspect-4/3 bg-amber-200 object-cover"
              src="https://i.pinimg.com/avif/736x/f5/1f/28/f51f28c222066c3fc644c05fc5822fff.avf"
              alt="journal"
            />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              AI-Powered Summaries
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Get concise and insightful summaries of your journal entries to
              track your progress and emotions.
            </p>
            <Button className="mt-4" variant="primary">
              Learn More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            {/* <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
            </div> */}
            <img
              className="rounded-2xl flex aspect-4/3 bg-amber-200 object-cover"
              src="https://i.pinimg.com/736x/ec/f7/8f/ecf78fc487893c8a8e3f92d71031d7bb.jpg"
              alt="chatbot"
            />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Smart Chatbot Buddy
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Chat with your mental health buddy for support, advice, or just a
              friendly conversation.
            </p>
            <Button className="mt-4" variant="primary">
              Learn More
            </Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            {/* <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <div className="h-12 w-12 border-2 border-zinc-300 bg-zinc-100" />
            </div> */}
            <img
              className="rounded-2xl flex aspect-4/3 bg-amber-200 object-cover"
              src="https://i.pinimg.com/736x/95/e9/04/95e904c85eb1c73fe9978270b2c2fadc.jpg"
              alt="mental health"
            />
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Personalized Wellness Goals
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Set and achieve wellness goals tailored to your needs and track
              your journey.
            </p>
            <Button className="mt-4" variant="primary">
              Learn More
            </Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
