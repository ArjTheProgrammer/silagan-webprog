import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<section className="min-h-screen bg-zinc-100 text-zinc-900">
			<div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div className="hidden lg:flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1420593248178-d88870618ca0?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBuYXR1cmV8ZW58MHx8MHx8fDA%3D"
            alt="Auth Illustration"
            className="object-top w-full h-screen border-zinc-300 bg-zinc-100"
          />
        </div>
				<main className="flex items-center bg-zinc-50 px-6 py-10 sm:px-10 lg:px-16">
					<div className="mx-auto w-full max-w-md">
						<Outlet />
					</div>
				</main>
			</div>
		</section>
	);
};

export default AuthLayout;
