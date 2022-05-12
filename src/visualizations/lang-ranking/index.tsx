import BumpChart from '../../components/bump-chart';
import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';

const COMMIT_INDEX = 0;
const PRS_INDEX = 1;
const REPO_INDEX = 2;

const chartContainer = {
  width: '100vh',
  height: '50vh'
};

export interface ChartData {
  id: string;
  data: {
    x: number;
    y: number | null | any;
  }[];
}

const LangRanking = () => {
  const [rankData, setRankData] = useState<ChartData[]>([] as ChartData[]);
  const [index, setIndex] = useState(0);
  const rankDict = {};

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
    switch (selectedIndex) {
      case COMMIT_INDEX:
        updateDataSource('./data/commits.csv');
        break;
      case PRS_INDEX:
        updateDataSource('./data/prs.csv');
        break;
      case REPO_INDEX:
        updateDataSource('./data/repos.csv');
        break;
      default:
        updateDataSource('./data/commits.csv');
        break;
    }
  };

  useEffect(() => console.log('entrei'), [rankData]);
  useEffect(() => init(), []);

  function init() {
    setIndex(0);
    updateDataSource('./data/commits.csv');
  }

  function updateDataSource(path: string) {
    d3.csv(path).then((data: any) => {
      data.map((d: any) => {
        const key: string = d.language_name;
        const dataArray = (rankDict as any)[key];
        if (!dataArray) {
          (rankDict as any)[key] = [
            {
              x: +d.year,
              y: +d.year_rank > 10 ? null : +d.year_rank
            }
          ];
        } else if (!(dataArray.filter((register: any) => register.x === +d.year).length > 0)) {
          dataArray.push({
            x: +d.year,
            y: +d.year_rank > 10 ? null : +d.year_rank
          });
        }
      });
      const filteredRanks: ChartData[] = [];
      for (const [key, value] of Object.entries(rankDict)) {
        const didNotAppearInTop10 = (value as any).every((data: any) => data.y == null);
        if ((value as any).length >= 11 && !didNotAppearInTop10)
          filteredRanks.push({ id: key, data: value as any });
      }
      filteredRanks.map((language) => language.data.sort((a, b) => a.x - b.x));
      console.log(filteredRanks);
      setRankData(filteredRanks);
    });
  }

  return (
    <>
      <h2>Languages Ranking</h2>
      <div style={{ width: '120vh' }}>
        <Carousel variant="dark" interval={null} activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                paddingBottom: '25px'
              }}>
              <h3>Commits</h3>
              <BumpChart data={rankData} styles={{ chartContainer }}></BumpChart>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                paddingBottom: '25px'
              }}>
              <h3>PRs</h3>
              <BumpChart data={rankData} styles={{ chartContainer }}></BumpChart>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                paddingBottom: '25px'
              }}>
              <h3>Repos</h3>
              <BumpChart data={rankData} styles={{ chartContainer }}></BumpChart>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default LangRanking;
