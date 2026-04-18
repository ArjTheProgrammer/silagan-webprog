import { NavLink } from "react-router-dom";

const links = [
  { label: "Home", to: "/" },
  { label: "Articles", to: "/articles" },
  { label: "About", to: "/about" },
];

const auth = [
  {label: 'Sign In', to: '/auth/signin'},
  {label: 'Sign Up', to: '/auth/signup'},
]

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
    isActive
      ? "border-zinc-900 bg-zinc-900 text-zinc-50"
      : "border-transparent text-zinc-500 hover:border-zinc-900 hover:bg-zinc-50 hover:text-zinc-900",
  ].join(" ");

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-teal-100/95 backdrop-blur">
      <div className="flex-8 flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="space-y-0.5">
            <img
              src="https://github.com/ArjTheProgrammer/nilai-frontend/blob/main/src/assets/nilai.png?raw=true"
              alt="Logo"
              className="h-20 w-auto"
            />
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <nav className="flex items-center gap-2" aria-label="Authentication">
          {auth.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClassName}>
              {link.label}
            </NavLink>
           ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
