import { render, h } from 'preact';
import './style.scss';

import Clause from './components/Clause';
import Dropdown from './components/Dropdown';

export const portalContainer = document.getElementById('madlibs-portals');

const App = () => {
  return (
    <div id="madlibs-root">
      <div class="clause-container">
        <Clause>
          Pull in
          <Dropdown
            options={[
              { label: 'yesterday’s Shopify orders', value: 'shopify' },
              { label: 'last week‘s returns', value: 'returns' },
              { label: 'June‘s ad spend', value: 'adSpend' },
            ]}
            classString="one"
          />
        </Clause>
        <Clause guaranteeWidth>
          Show me all the orders that<br />
          <Dropdown
            options={[
              { label: 'have', value: 'have' },
              { label: 'have not', value: 'haveNot' },
            ]}
            classString="two"
          />
          been&nbsp;fulfilled
        </Clause>
        <Clause>
          Send data
          <Dropdown
            options={[
              { label: 'as an email', value: 'email' },
              { label: 'to Shopify', value: 'shopify' },
              { label: 'to Google Sheets', value: 'googleSheets' },
            ]}
            classString="three"
            alignRight
          />
          <Dropdown
            options={[
              { label: 'once\u00a0per day', value: 'daily' },
              { label: 'every hour', value: 'hourly' },
              { label: 'every Monday', value: 'weekly' },
            ]}
            classString="four"
            alignRight
          />
        </Clause>
      </div>
      <div class="madlibs-illustration">
        <img src="./images/left1.png" />
        <img src="./images/middle.png" />
        <img src="./images/right1.png" />
      </div>
    </div>
  );
};

render(
  <App />,
  document.body,
  document.querySelector('#madlibs-root')
);
