import Navbar from '../../components/navbar';
import pages from '../../utils/links';
import ChangeRanking from '../../visualizations/change-ranking';
import LangRanking from '../../visualizations/lang-ranking';
import LangAttributesParallel from '../../visualizations/lang-attributes-parallel';
import LineCharts from '../../visualizations/line-charts';

const Visualizations = () => {
  return (
    <div className="Visualizations">
      <Navbar links={pages} />
      <LangRanking></LangRanking>
      <LangAttributesParallel />
      <ChangeRanking></ChangeRanking>
      <LineCharts></LineCharts>
    </div>
  );
};

export default Visualizations;
