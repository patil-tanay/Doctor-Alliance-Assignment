import { useState } from 'react';
import { AuthForm as IAuthForm } from '../types/auth';
import { loginUser, registerUser } from '../lib/api';
import { FileText, Lock, User, ArrowRight, Mail } from 'lucide-react';

interface LoginProps {
  onLogin: (token: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (data: IAuthForm) => {
    try {
      if (isLogin) {
        const { token } = await loginUser(data);
        localStorage.setItem('username', data.username);
        onLogin(token);
      } else {
        await registerUser(data);
        setSuccess('Registration successful! You can now login.');
        setError('');
        setIsLogin(true);
      }
    } catch (err) {
      setError(isLogin ? 'Invalid username or password' : 'Username already exists');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-[55%] p-8 lg:p-20 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 opacity-50" />
        
        <div className="relative w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Doctor Alliance</h1>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </h2>
            <p className="mt-2 text-gray-600">
              {isLogin 
                ? 'Please enter your credentials to access your account'
                : 'Fill in the details below to get started'}
            </p>
          </div>

          {(error || success) && (
            <div className={`mb-6 p-4 rounded-lg border ${
              error 
                ? 'bg-red-50 border-red-100 text-red-700' 
                : 'bg-green-50 border-green-100 text-green-700'
            }`}>
              {error || success}
            </div>
          )}

          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit({
              username: formData.get('username') as string,
              password: formData.get('password') as string,
            });
          }} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  required
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl
                    focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
                    transition-all duration-200"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl
                    focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
                    transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium
                hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50
                transition-all duration-200 flex items-center justify-center gap-2
                group"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
              }}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline
                focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-lg px-2 py-1"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Illustration */}
      <div className="hidden lg:block w-[45%] bg-gradient-to-br from-blue-500 to-indigo-600 p-20">
        <div className="h-full flex flex-col justify-between text-white">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Manage Your Paperless Documents</h2>
            <p className="text-blue-100">
            Eliminate manual work for your staff, saving you significant labor costs. We can automatically upload, sign and download document and place them in appropriate patient charts.

            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold">Easy Uploads</h3>
              <p className="text-sm text-blue-100">
                Simple and secure way to upload and manage your resumes
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold">Easy View</h3>
              <p className="text-sm text-blue-100">
                Your documents can be accessed and viewed securely
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}