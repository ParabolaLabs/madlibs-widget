import { render, h } from 'preact';
import { useState } from 'preact/hooks';
import './style.scss';

import Clause from './components/Clause';
import Dropdown from './components/Dropdown';

import {
  PULL_OPTIONS,
  FILTER_OPTIONS,
  PUSH_OPTIONS,
  SCHEDULE_OPTIONS,
} from './constants';

export const portalContainer = document.getElementById('madlibs-portals');

const App = () => {
  const [pullOption, setPullOption] = useState(PULL_OPTIONS[0]);
  const [filterOption, setFilterOption] = useState(FILTER_OPTIONS[0]);
  const [pushOption, setPushOption] = useState(PUSH_OPTIONS[0]);
  const [scheduleOption, setScheduleOption] = useState(SCHEDULE_OPTIONS[0]);

  return (
    <div id="madlibs-root">
      <div class="clause-container">
        <Clause>
          Pull in
          <Dropdown
            options={PULL_OPTIONS}
            selectedOption={pullOption}
            setSelectedOption={setPullOption}
            classString="one"
          />
        </Clause>
        <Clause guaranteeWidth>
          Show me all the orders that<br />
          <Dropdown
            options={FILTER_OPTIONS}
            selectedOption={filterOption}
            setSelectedOption={setFilterOption}
            classString="two"
          />
          been&nbsp;fulfilled
        </Clause>
        <Clause>
          Send data
          <Dropdown
            options={PUSH_OPTIONS}
            selectedOption={pushOption}
            setSelectedOption={setPushOption}
            classString="three"
            alignRight
          />
          <Dropdown
            options={SCHEDULE_OPTIONS}
            selectedOption={scheduleOption}
            setSelectedOption={setScheduleOption}
            classString="four"
            alignRight
          />
        </Clause>
      </div>
      <div class="madlibs-illustration">
        <img src={`./images/${pullOption.value}.png`} />
        <img src="./images/middle.png" />
        <img src={`./images/${pushOption.value}.png`} />
      </div>
    </div>
  );
};

render(
  <App />,
  document.body,
  document.querySelector('#madlibs-root')
);
