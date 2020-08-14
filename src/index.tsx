import { render, h } from 'preact';
import './style.scss';

const App = () => (
  <div id="madlibs">
    <div data-component="clause" id="madlibs-clause-import" class="clause green">
      <div class="clause-inner">
        <span class="prefix">Pull in</span>
        <span class="clause-dropdown one" id="import-dropdown" data-component="select" data-onchange="onImportChange">
          <select class="clause-entry" hidden>
            <option value="shopify">yesterday’s Shopify orders</option>
            <option value="returns">last week’s returns</option>
            <option value="adSpend">June’s ad spend</option>
          </select>
          <a class="clause-entry"><span>yesterday’s </span><span>Shopify&nbsp;</span><span>orders</span></a>
        </span>
      </div>
    </div>
    <div data-component="clause" id="madlibs-clause-process" class="clause guarantee-width orange">
      <div class="clause-inner">
        <span class="prefix">Show me all the orders that<br /></span>
        <span class="clause-dropdown two" id="process-dropdown" data-component="select">
          <select class="clause-entry" hidden>
            <option value="have">have</option>
            <option value="haveNot">have not</option>
          </select>
          <a class="clause-entry"><span>have</span></a>
        </span>
        <span class="suffix">been&nbsp;fulfilled</span>
      </div>
    </div>
    <div data-component="clause" id="madlibs-clause-export" class="clause teal">
      <div class="clause-inner">
        <span class="prefix">Send data</span>
        <span class="clause-dropdown three" id="export-dropdown" data-component="select" data-align="right">
          <select class="clause-entry" hidden>
            <option value="email">as an email</option>
            <option value="shopify">to Shopify</option>
            <option value="googleSheets">to Google Sheets</option>
          </select>
          <a class="clause-entry"><span>as </span><span>an&nbsp;</span><span>email</span></a>
        </span>
        <span class="clause-dropdown four" id="schedule-dropdown" data-component="select" data-align="right">
          <select class="clause-entry" hidden>
            <option value="daily">once&nbsp;per day</option>
            <option value="horuly">every hour</option>
            <option value="weekly">every Monday</option>
          </select>
          <a class="clause-entry"><span>once&nbsp;per&nbsp;</span><span>day</span></a>
        </span>
      </div>
    </div>
  </div>
);

render(
  <App />,
  document.body,
  document.querySelector('#madlibs')
);
