import { h } from 'preact';
import { useState } from 'preact/hooks';

export type Option = {
  value: string,
  label: string,
};

interface DropdownProps {
  options: Option[];
  classString: string;
}

const NBSP = '\u00a0';

const adoptOrphans = (text: string) => {
  const words = text.split(' ');

  return words.reduce((newString: string, word: string, i: number) => {
    if (i === words.length - 2) {
      return `${newString}${word}${NBSP}`;
    } else if (i !== words.length - 1) {
      return `${newString}${word} `;
    } else {
      return `${newString}${word}`;
    }
  }, '');
};

const Dropdown = ({ options, classString }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectionOption, setSelectedOption] = useState(options[0]);

  const classes = ['clause-dropdown', classString];

  const toggle = () => setIsOpen(!isOpen);

  return (
    <span class={classes.join(' ')}>
      {' '}
      <a class="clause-entry" onClick={toggle} >{adoptOrphans(selectionOption.label)}</a>
      {' '}
    </span>
  );
};

export default Dropdown ;
