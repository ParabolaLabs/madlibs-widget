import { h } from 'preact';
import type { Option } from './Dropdown';

interface DropdownMenuProps {
  options: Option[];
  setSelectedOption: (option: Option) => void;
}

const DropdownMenu = ({ options, setSelectedOption }: DropdownMenuProps) => {
  return (
    <menu class="clause-menu">
      {options.map((option) => {
        return (
          <menuitem onClick={() => setSelectedOption(option)}>{option.label}</menuitem>
        );
      })}
    </menu>
  );
};

export default DropdownMenu;
