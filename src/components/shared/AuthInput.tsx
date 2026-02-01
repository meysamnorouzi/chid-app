import { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { InputHTMLAttributes } from 'react'

interface AuthInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  isNumberOrLink?: boolean // برای شماره یا لینک - چپ‌چین می‌شود
}

function AuthInput({
  label,
  value,
  onChange,
  error,
  isNumberOrLink = false,
  className = '',
  required = false,
  type = 'text',
  ...props
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPasswordInput = type === 'password'
  const inputDir = isNumberOrLink ? 'ltr' : 'rtl'
  const textAlign = isNumberOrLink ? 'text-left' : 'text-right'

  return (
    <div className="space-y-2 w-full">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 mr-1">*</span>}
      </label>
      <div className="relative">
        <input
          {...props}
          type={isPasswordInput ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir={inputDir}
          className={`w-full px-4 py-3 rounded-xl border ${isPasswordInput ? 'pl-10' : ''} ${
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-gray-200 focus:border-black focus:ring-2 focus:ring-gray-300'
          } outline-none transition-all ${textAlign} ${className}`}
          required={required}
        />
        {isPasswordInput && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? 'مخفی کردن رمز' : 'نمایش رمز'}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  )
}

export default AuthInput

