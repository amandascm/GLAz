import Navbar from '../../components/navbar';
import pages from '../../utils/links';
import ChangeRanking from '../../visualizations/change-ranking';
import LangRanking from '../../visualizations/lang-ranking';
import LineCharts from '../../visualizations/line-charts';
import WordCloud from '../../visualizations/word-cloud';

const Visualizations = () => {
  return (
    <div className="Visualizations">
      <Navbar links={pages} />
      <WordCloud></WordCloud>
      <LangRanking></LangRanking>
      <LineCharts></LineCharts>
      <ChangeRanking></ChangeRanking>
    </div>
  );
};

export default Visualizations;
