import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import DropdownLabel from './DropdownLabel';
import DropdownMenu from './DropdownMenu';

export type Position = {
  top: number,
  left?: number,
  right?: number,
};

export type Option = {
  value: string,
  label: string,
};

interface DropdownProps {
  options: Option[];
  classString: string;
  alignRight?: boolean;
}

const Dropdown = ({ options, classString, alignRight }: DropdownProps) => {
  const wrapperRef = useRef(null);
  const labelRef = useRef(null);
  const [position, setPosition] = useState({ top: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const classes = ['clause-dropdown', classString];

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const onClickOutside = (e: Event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      close();
    }
  };

  useEffect(() => {
    if (isOpen) {
      const el = labelRef.current.base;
      const rect = el.getBoundingClientRect();

      const position: Position = {
        top: rect.top + rect.height,
      };

      if (alignRight) {
        position.left = rect.left - rect.width;
      } else {
        position.left = rect.left;
      }

      setPosition(position);
    }
  }, [isOpen, labelRef]);

  useEffect(() => {
    document.addEventListener('click', onClickOutside);
    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, []);

  return (
    <span class={classes.join(' ')} ref={wrapperRef}>
      {' '}
      <DropdownLabel classString={classString} label={selectedOption.label} onClick={toggle} ref={labelRef} />
      {' '}
      <DropdownMenu
        options={options}
        setSelectedOption={setSelectedOption}
        position={position}
        isOpen={isOpen}
        classString={classString}
      />
    </span>
  );
};

export default Dropdown;
