import Navbar from '../../components/navbar';
import pages from '../../utils/links';
import ChangeRanking from '../../visualizations/change-ranking';
import LangRanking from '../../visualizations/lang-ranking';
import LineCharts from '../../visualizations/line-charts';
import WordCloud from '../../visualizations/word-cloud';
import './styles.css';

const Visualizations = () => {
  return (
    <div className="Visualizations">
      <Navbar links={pages} />
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
        <div
          style={{
            width: '40%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}>
          <h1>Data Visualizations</h1>
          <p>
            A set of data visualizations to provide insights about GitHub open source repositories
            languages, based on{' '}
            <a href="https://cloud.google.com/blog/topics/public-datasets/github-on-bigquery-analyze-all-the-open-source-code">
              a full snapshot of the content of more than 2.8 million open source GitHub
              repositories in BigQuery
            </a>{' '}
            along with the{' '}
            <a href="https://www.kaggle.com/datasets/isaacwen/github-programming-languages-data">
              GitHub Programming Languages Data from Kaggle
            </a>
            .
          </p>
        </div>
        <WordCloud></WordCloud>
        <LangRanking></LangRanking>
        <LineCharts></LineCharts>
        <ChangeRanking></ChangeRanking>
      </div>
    </div>
  );
};

export default Visualizations;
