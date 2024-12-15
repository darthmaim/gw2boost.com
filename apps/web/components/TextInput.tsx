import type { ChangeEvent, FC, HTMLInputAutoCompleteAttribute } from 'react';
import styles from './TextInput.module.css';

export type TextInputProps = {
  id?: string,
  name?: string,
  placeholder?: string,
  readOnly?: boolean,
  autoFocus?: boolean,
  autoComplete?: HTMLInputAutoCompleteAttribute,
} & (
  | { defaultValue?: string }
  | { value: string, onChange: (value: string, e: ChangeEvent) => void }
)

export const TextInput: FC<TextInputProps> = (props) => {
  return (
    <input type="text" className={styles.input} {...props} onChange={'onChange' in props ? (e) => props.onChange(e.target.value, e) : undefined}></input>
  );
};
