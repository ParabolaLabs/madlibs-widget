export const PULL_OPTIONS = [
  { label: 'yesterday’s shopify orders', value: 'shopify-import' },
  { label: 'last week‘s returns', value: 'returns' },
  { label: 'June‘s ad spend', value: 'adspend' },
];

export const FILTER_OPTIONS = [
  { label: 'have', value: 'have' },
  { label: 'have not', value: 'haveNot' },
];

export const PUSH_OPTIONS = [
  { label: 'as an email', value: 'email' },
  { label: 'to Shopify', value: 'shopify-export' },
  { label: 'to Google Sheets', value: 'google-sheets' },
];

export const SCHEDULE_OPTIONS = [
  { label: 'once\u00a0per day', value: 'daily' },
  { label: 'every hour', value: 'hourly' },
  { label: 'every Monday', value: 'weekly' },
];
