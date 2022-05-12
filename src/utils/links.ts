export interface LinkInterface {
  name: string;
  to: string;
}

const pages: LinkInterface[] = [
  { name: 'Home', to: '/' },
  { name: 'Visualizations', to: '/vis' }
];

export default pages;
