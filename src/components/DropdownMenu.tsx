import { h } from 'preact';
import type { Option, Position } from './Dropdown';

import { createPortal } from 'preact/compat';
import { portalContainer } from '../';

interface DropdownMenuProps {
  options: Option[];
  setSelectedOption: (option: Option) => void;
  position: Position;
  classString: string;
  isOpen: boolean;
}

const DropdownMenu = ({ options, setSelectedOption, position, isOpen, classString }: DropdownMenuProps) => {
  const classes = ['clause-menu', classString];

  const portal = createPortal(
    <menu class={classes.join(' ')} style={position}>
      {options.map((option) => {
        return (
          <menuitem class="clause-menu-item" onClick={() => setSelectedOption(option)}>{option.label}</menuitem>
        );
      })}
    </menu>,
    portalContainer
  );

  if (!isOpen) return null;

  return portal;
};

export default DropdownMenu;
