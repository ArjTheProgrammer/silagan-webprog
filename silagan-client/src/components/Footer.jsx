const Footer = () => {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-zinc-900 bg-teal-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 py-2 px-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-center text-zinc-500">
          &copy; {new Date().getFullYear()} Silagan WebProg. All rights
          reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
