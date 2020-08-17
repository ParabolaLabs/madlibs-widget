import { h, Ref } from 'preact';

interface DropdownLabelProps {
  label: string;
  onClick: () => void;
  classString: string;
  ref: Ref<HTMLAnchorElement>;
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

const DropdownLabel = ({ label, onClick, ref, classString }: DropdownLabelProps) => {
  const classes = ['clause-entry', classString];

  return (
    <a class={classes.join(' ')} onClick={onClick} ref={ref}>
      {adoptOrphans(label)}
    </a>
  );
};

export default DropdownLabel;
