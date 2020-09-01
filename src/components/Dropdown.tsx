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
  selectedOption: Option;
  setSelectedOption: (option: Option) => void;
}

const Dropdown = ({ options, classString, alignRight, selectedOption, setSelectedOption }: DropdownProps) => {
  const wrapperRef = useRef(null);
  const labelRef = useRef(null);
  const [position, setPosition] = useState({ top: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const classes = ['clause-dropdown', classString];
  if (isOpen) classes.push('open');

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
        top: window.scrollY + rect.top + rect.height, // account for webflow positioning
      };

      if (alignRight) {
        position.left = rect.right - 188; // account for menu width, margins etc.
      } else {
        position.left = rect.left;
      }

      setPosition(position);
    }
  }, [isOpen, labelRef]);

  useEffect(() => {
    document.addEventListener('click', onClickOutside);
    document.addEventListener('resize', close);
    return () => {
      document.removeEventListener('click', onClickOutside);
      document.removeEventListener('resize', close);
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
