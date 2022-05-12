import Navbar from '../../components/Navbar';
import pages from '../../utils/links';
import LangRanking from '../../visualizations/lang-ranking';

const Visualizations = () => {
  return (
    <div className="Visualizations">
      <Navbar links={pages} />
      <LangRanking></LangRanking>
    </div>
  );
};

export default Visualizations;
