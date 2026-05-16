import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { loginUser } from '../../services/UserService';

const inputClasses =
	'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignInPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			// Call the login API
			const { data } = await loginUser({ email, password });
			console.log('Login successful:', data);

			localStorage.setItem('token', data.token);
			localStorage.setItem('fullName', data.fullName);
			localStorage.setItem('role', data.role);

			// Navigate to the dashboard with the user's email and type
			navigate('/dashboard', { state: { fullName: data.fullName, role: data.role } });
		} catch (err) {
			console.error('Login failed:', err.response?.data?.message || err.message);
			setError(err.response?.data?.message || 'Login failed. Please try again.');
		}
	};

	return (
		<>
			<h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Log In</h1>

			{error && <p style={{ color: 'red' }}>{error}</p>}

			<form className="mt-8 space-y-5" onSubmit={handleLogin}>
				<div>
					<label htmlFor="signin-email" className="text-sm font-medium text-zinc-700">
						Email Address
					</label>
					<input
						id="signin-email"
						type="email"
						placeholder="johndoe@email.com"
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={inputClasses}
						required
					/>
				</div>

				<div>
					<label htmlFor="signin-password" className="text-sm font-medium text-zinc-700">
						Password
					</label>
					<input
						id="signin-password"
						type="password"
						placeholder="enter password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={inputClasses}
						required
					/>
					<p className="mt-2 text-xs leading-5 text-zinc-500">
						It must be a combination of minimum 8 letters, numbers, and symbols.
					</p>
				</div>

				<div className="flex items-center justify-between gap-4 text-sm">
					<label className="flex items-center gap-2 text-zinc-600">
						<input type="checkbox" className="h-4 w-4 rounded border-zinc-300 accent-zinc-900" />
						<span>Remember me</span>
					</label>
					<button type="button" className="font-medium text-zinc-700 transition hover:text-zinc-900">
						Forgot Password?
					</button>
				</div>

				<Button type="submit" variant="primary" className={actionButtonClassName}>
					Log In
				</Button>

				<div className="grid gap-3 pt-2 sm:grid-cols-2">
					<Button type="button" variant="secondary" className={actionButtonClassName}>
						<FcGoogle className="text-3xl" />
					</Button>
					<Button type="button" variant="secondary" className={actionButtonClassName}>
						<FaApple className="text-3xl" />
					</Button>
				</div>
			</form>

			<div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
				No account yet?{' '}
				<Link to="/auth/signup" className="font-semibold text-zinc-900 transition hover:text-zinc-600">
					Sign Up
				</Link>
			</div>
		</>
	);
};

export default SignInPage;