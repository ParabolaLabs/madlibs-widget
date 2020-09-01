import { h, FunctionalComponent, JSX } from 'preact';

interface ClauseProps {
  children?: Array<JSX.Element | string>;
  guaranteeWidth?: boolean;
}

const Clause: FunctionalComponent<ClauseProps> = ({ children, guaranteeWidth }) => {
  const classes = ['clause'];

  if (guaranteeWidth) classes.push('guarantee-width');

  return (
    <div class={classes.join(' ')}>
      <div class="clause-inner">
        {children}
      </div>
    </div>
  );
};

export default Clause;
