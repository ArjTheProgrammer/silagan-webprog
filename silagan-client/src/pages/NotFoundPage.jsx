import React from "react";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 text-zinc-900 font-sans p-8 rounded-3xl shadow-xl">
      <img
        src="https://github.com/ArjTheProgrammer/nilai-frontend/blob/main/src/assets/nilai.png?raw=true"
        alt="Nilai Logo"
        className="h-28 w-auto mb-6"
      />
      <h1 className="text-4xl sm:text-5xl font-bold mb-2 tracking-tight text-zinc-900">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-zinc-600 mb-6 text-center max-w-md">
        The page you’re looking for doesn’t exist or was moved.
        <br />
        Let’s get you back to journaling smarter!
      </p>
      <a
        href="/"
        className="inline-block bg-zinc-900 text-white px-8 py-3 rounded-full font-semibold text-base shadow-md hover:bg-zinc-800 transition-colors duration-200"
      >
        Go Home
      </a>
    </div>
  );
}

export default NotFoundPage;
