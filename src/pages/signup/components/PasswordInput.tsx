import { Eye, EyeOff } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  success?: string;
  showPassword?: boolean;
  onToggleShow?: () => void;
  placeholder?: string;
}

export const PasswordInput = ({
  label,
  value,
  onChange,
  error,
  success,
  showPassword,
  onToggleShow,
  placeholder,
}: PasswordInputProps) => {
  return (
    <div className='space-y-4'>
      <Label className='text-base text-zinc-100'>{label}</Label>
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => e.key === ' ' && e.preventDefault()}
          className='h-10 bg-zinc-900 pr-10 text-zinc-100'
          placeholder={placeholder}
        />
        {onToggleShow &&
          (showPassword ? (
            <EyeOff
              className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-zinc-400 transition-colors hover:text-zinc-100'
              onClick={onToggleShow}
            />
          ) : (
            <Eye
              className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-zinc-400 transition-colors hover:text-zinc-100'
              onClick={onToggleShow}
            />
          ))}
      </div>
      <div className='h-1'>
        {error && <p className='text-sm text-red-500'>{error}</p>}
        {success && <p className='text-sm text-green-500'>{success}</p>}
      </div>
    </div>
  );
};
