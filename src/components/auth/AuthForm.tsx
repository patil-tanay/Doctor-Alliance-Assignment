import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn, UserPlus } from 'lucide-react';
import { authSchema, AuthForm as IAuthForm } from '../../types/auth';
import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (data: IAuthForm) => Promise<void>;
  error: string;
  success: string;
  onToggleMode: () => void;
}

export function AuthForm({ isLogin, onSubmit, error, success, onToggleMode }: AuthFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<IAuthForm>({
    resolver: zodResolver(authSchema),
  });

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <div className="flex items-center justify-center mb-8">
        {isLogin ? (
          <LogIn className="w-12 h-12 text-blue-600" />
        ) : (
          <UserPlus className="w-12 h-12 text-blue-600" />
        )}
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? 'Login' : 'Register'}
      </h2>
      
      <Alert type="error" message={error} />
      <Alert type="success" message={success} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Username"
          type="text"
          error={errors.username?.message}
          {...register('username')}
        />

        <Input
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" className="w-full">
          {isLogin ? 'Sign In' : 'Register'}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <Button
          variant="link"
          onClick={onToggleMode}
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </Button>
      </div>
    </div>
  );
}