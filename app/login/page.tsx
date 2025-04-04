import LoginForm from '@/components/loginForm';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-950 p-8 rounded-lg shadow-lg">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 text-blue-500">Kavyapath</h1>
          <h1 className="text-2xl font-bold text-center mb-6 dark:text-white">Login</h1>
          <LoginForm />
          <p className="text-center mt-4">Don't have an account? <Link href="/register" className="text-blue-500">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;