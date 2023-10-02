import React, { FC } from 'react';

import s from './index.module.scss';

interface PButton {
  className?: string;
  disabled?: boolean;
  onClick?: (x: any) => void;
  type: 'large' | 'medium' | 'small' | 'fullWidth';
  color?: 'red' | 'blue' | 'redFilled';
  active?: boolean;
  children?: React.ReactChild | React.ReactNode | string;
  style?: any;
  buttonType?: 'submit' | 'reset' | 'button';
}

export const Button: FC<PButton> = ({
  className = '',
  disabled = false,
  onClick,
  children,
  type,
  active = false,
  style,
  buttonType = 'button',
  color = 'red',
}) => (
  <button
    type={buttonType}
    aria-label='control'
    className={`${s[type]} ${s[color]} ${s.button} ${disabled ? s.disabled : ''} ${
      active ? s.active : ''
    } ${className}`}
    onClick={onClick}
    style={style}
    disabled={disabled}
  >
    <span style={{ pointerEvents: 'none' }}>{children}</span>
  </button>
);
