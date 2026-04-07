import ArticleList from "../components/ArticleList.jsx";
import Button from "../components/Button.jsx";
import articles from "../assets/article-content.js";

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.28em] text-zinc-500">
          Journaling
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          AI-Powered Journaling for Mental Wellness
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Discover the power of AI in journaling. Summarize your thoughts, gain
          insights, and chat with your smart mental health buddy.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-zinc-500">
            Featured Features
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Explore Our Tools
          </h2>
        </div>

        <ArticleList articles={articles} />

        {/* <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img
              className="rounded-[1.25rem] h-48 w-full object-cover"
              src="https://i.pinimg.com/avif/736x/f5/1f/28/f51f28c222066c3fc644c05fc5822fff.avf"
              alt="image 1"
            />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[.24em] text-zinc-500">
              Feature 01
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Journal Summaries
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Let AI summarize your journal entries, providing you with key
              insights and reflections.
            </p>
            <Button className="mt-4">Learn More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img
              className="rounded-[1.25rem] h-48 w-full object-cover"
              src="https://i.pinimg.com/736x/ec/f7/8f/ecf78fc487893c8a8e3f92d71031d7bb.jpg"
              alt="image 2"
            />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[.24em] text-zinc-500">
              Feature 02
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Smart Chatbot Buddy
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Engage with your AI-powered mental health buddy for support and
              guidance.
            </p>
            <Button className="mt-4">Learn More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img
              className="rounded-[1.25rem] h-48 w-full object-cover"
              src="https://i.pinimg.com/736x/95/e9/04/95e904c85eb1c73fe9978270b2c2fadc.jpg"
              alt="image 3"
            />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[.24em] text-zinc-500">
              Feature 03
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Mood Tracking
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Track your mood over time and identify patterns with the help of
              AI.
            </p>
            <Button className="mt-4">Learn More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <img
              className="rounded-[1.25rem] h-48 w-full object-cover"
              src="https://i.pinimg.com/736x/6d/56/d9/6d56d9bf0a6baff16a8f83cfec67f05b.jpg"
              alt="image 4"
            />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[.24em] text-zinc-500">
              Feature 04
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">
              Personalized Insights
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Receive personalized insights and recommendations based on your
              journaling habits.
            </p>
            <Button className="mt-4">Learn More</Button>
          </article>
        </div> */}
      </section>
    </div>
  );
};

export default ArticleListPage;
