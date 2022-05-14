import Navbar from '../../components/Navbar';
import pages from '../../utils/links';
import ChangeRanking from '../../visualizations/change-ranking';
import LangRanking from '../../visualizations/lang-ranking';

const Visualizations = () => {
  return (
    <div className="Visualizations">
      <Navbar links={pages} />
      <LangRanking></LangRanking>
      <ChangeRanking></ChangeRanking>
    </div>
  );
};

export default Visualizations;
