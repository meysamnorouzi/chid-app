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
  ...props
}: AuthInputProps) {
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
      <input
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir={inputDir}
        className={`w-full px-4 py-3 rounded-xl border ${
          error
            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
            : 'border-gray-200 focus:border-black focus:ring-2 focus:ring-gray-300'
        } outline-none transition-all ${textAlign} ${className}`}
        required={required}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  )
}

export default AuthInput

