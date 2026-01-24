/**
 * RadioGroup Component
 * 
 * Display a group of radio buttons
 * Designed with SEO, accessibility, security, and modular structure in mind
 */

import { useState, useContext } from 'react';
import { DocumentationThemeContext } from '../../../theme/DocumentationThemeContext';
import { documentationTheme } from '../../../theme/themes/documentationTheme';
import Radio from './Radio';
import type { RadioGroupProps } from './types';

const RadioGroup = ({
  options,
  value: controlledValue,
  defaultValue,
  name,
  variant = 'default',
  size = 'md',
  orientation = 'vertical',
  onChange,
  className = '',
  style,
  'aria-label': ariaLabel,
}: RadioGroupProps) => {
  // Get theme from context, fallback to default theme if not in documentation context
  const themeContext = useContext(DocumentationThemeContext);
  const theme = themeContext?.theme || documentationTheme;

  const [internalValue, setInternalValue] = useState<string | number | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = (selectedValue: string | number) => {
    if (!isControlled) {
      setInternalValue(selectedValue);
    }
    onChange?.(selectedValue);
  };

  const groupName = name || `radio-group-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      className={`flex ${orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-3'} ${className}`}
      style={style}
      role="radiogroup"
      aria-label={ariaLabel || 'Radio group'}
    >
      {options.map((option, index) => (
        <Radio
          key={index}
          label={option.label}
          value={option.value}
          checked={currentValue === option.value}
          disabled={option.disabled}
          variant={variant}
          size={size}
          name={groupName}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default RadioGroup;

