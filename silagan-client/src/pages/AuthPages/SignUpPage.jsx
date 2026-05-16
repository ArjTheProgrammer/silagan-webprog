import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { createUser, loginUser } from '../../services/UserService';

const inputClasses =
	'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [birthdate, setBirthdate] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError('');
		setIsSubmitting(true);

		try {
			await createUser({
				fullName: fullName.trim(),
				email: email.trim(),
				birthdate,
				password,
				role: 'viewer',
				isActive: true,
			});

			const { data } = await loginUser({ email, password });

			localStorage.setItem('token', data.token);
			localStorage.setItem('fullName', data.fullName);
			localStorage.setItem('role', data.role);

			navigate('/dashboard', { state: { fullName: data.fullName, role: data.role } });
		} catch (err) {
			console.error('Sign up failed:', err.response?.data?.message || err.message);
			setError(err.response?.data?.message || 'Sign up failed. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Sign Up</h1>
			<p className="mt-3 text-sm leading-6 text-zinc-600">
				Create your account with the same monochrome layout pattern and shared button treatment.
			</p>

			{error && <p className="mt-4 text-sm text-red-600">{error}</p>}

			<form className="mt-6 space-y-4" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="signup-full-name" className="text-sm font-medium text-zinc-700">
						Full Name
					</label>
					<input
						id="signup-full-name"
						type="text"
						placeholder="John Doe"
						autoComplete="name"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						className={inputClasses}
						required
					/>
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					<div>
						<label htmlFor="signup-email" className="text-sm font-medium text-zinc-700">
							Email
						</label>
						<input
							id="signup-email"
							type="email"
							placeholder="johndoe@gmail.com"
							autoComplete="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={inputClasses}
							required
						/>
					</div>
					<div>
						<label htmlFor="signup-birthdate" className="text-sm font-medium text-zinc-700">
							Birthdate
						</label>
						<input
							id="signup-birthdate"
							type="date"
							value={birthdate}
							onChange={(e) => setBirthdate(e.target.value)}
							className={inputClasses}
							required
						/>
					</div>
				</div>

				<div>
					<label htmlFor="signup-password" className="text-sm font-medium text-zinc-700">
						Password
					</label>
					<input
						id="signup-password"
						type="password"
						placeholder="enter password"
						autoComplete="new-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className={inputClasses}
						required
					/>
					<p className="mt-2 text-xs leading-5 text-zinc-500">
						Use a secure password with letters, numbers, and symbols.
					</p>
				</div>

				<Button
					type="submit"
					variant="primary"
					className={actionButtonClassName}
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Creating Account...' : 'Create Account'}
				</Button>

				<div className="grid gap-3 pt-2 sm:grid-cols-2">
					<Button type="button" variant="secondary" className={actionButtonClassName}>
						<FcGoogle className='text-3xl' />
					</Button>
					<Button type="button" variant="secondary" className={actionButtonClassName}>
						<FaApple className='text-3xl' />
					</Button>
				</div>
			</form>

			<div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
				Already have an account?{' '}
				<Link to="/auth/signin" className="font-semibold text-zinc-900 transition hover:text-zinc-600">
					Log In
				</Link>
			</div>
		</>
	);
};

export default SignUpPage;
