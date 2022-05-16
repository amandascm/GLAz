import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import RangeSlider from '../../components/range-slider';
import WordCloudChart from '../../components/word-cloud-chart';

const COMMIT_INDEX = 0;
const PRS_INDEX = 1;
const REPO_INDEX = 2;

const MIN_YEAR = 2011;
const MAX_YEAR = 2022;

const chartContainer = {
  width: '70vw',
  height: '50vh'
};

export interface ChartData {
  id: string;
  data: {
    x: number;
    y: number | null | any;
    occ: number;
  }[];
}

const events = ['Commits', 'PRs', 'Repos'];

const WordCloud = () => {
  const [langData, setLangData] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [min, setMin] = useState(MIN_YEAR);
  const [max, setMax] = useState(MAX_YEAR);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const languagesData = require('./data/languages_data.json');
  const [totalWords, setTotalWords] = useState<number[]>([]);
  const [wordsTypes, setWordsTypes] = useState({});

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    switch (index) {
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
  }, [index]);

  const indexEventMapper = ['commit_count', 'pr_count', 'repos_count'];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  useEffect(() => {}, [langData]);
  useEffect(() => {
    switch (index) {
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
  }, [min, max]);
  useEffect(() => init(), []);

  function init() {
    setIndex(0);
    updateDataSource('./data/commits.csv');
  }

  function updateDataSource(path: string) {
    const rankDict = {};
    d3.csv(path).then((data: any) => {
      data.map((d: any) => {
        const key: string = d.language_name;
        const dataArray = (rankDict as any)[key];
        if (!dataArray) {
          (rankDict as any)[key] = [
            {
              x: +d.year,
              y: +d.year_rank > 20 ? null : +d.year_rank,
              occ: +d[indexEventMapper[index]] ?? 0
            }
          ];
        } else if (!(dataArray.filter((register: any) => register.x === +d.year).length > 0)) {
          dataArray.push({
            x: +d.year,
            y: +d.year_rank > 20 ? null : +d.year_rank,
            occ: +d[indexEventMapper[index]] ?? 0
          });
        } else if (dataArray.filter((register: any) => register.x === +d.year).length > 0) {
          const year_index = dataArray.map((obj: any) => obj.x).indexOf(+d.year);
          dataArray.splice(year_index, 1, {
            x: dataArray[year_index].x,
            y: dataArray[year_index].y,
            occ: dataArray[year_index].occ + (+d[indexEventMapper[index]] ?? 0)
          });
        }
      });
      let filteredRanks: ChartData[] = [];
      for (const [key, value] of Object.entries(rankDict)) {
        filteredRanks.push({ id: key, data: value as any });
      }
      filteredRanks.map((language) => language.data.sort((a, b) => a.x - b.x));
      filteredRanks.map((language) => {
        language.data = language.data.filter(
          (dataPoint) => dataPoint.x >= min && dataPoint.x <= max
        );
      });

      filteredRanks = filteredRanks.filter((obj) => !obj.data.every((val: any) => val.y == null));
      const words: any = {};
      const wordsTypesTemp: any = {};
      filteredRanks.forEach((obj) => {
        if (languagesData[obj.id]) {
          const factor = obj.data
            .map((v) => (v.y !== null ? v.occ : 0))
            .reduce((previousValue: any, currentValue: any) => previousValue + currentValue, 0);
          languagesData[obj.id].purposes.forEach((element: any) => {
            if (!words[element]) {
              words[element] = factor;
              wordsTypesTemp[element] = 'Language purpose';
            } else {
              words[element] += factor;
              wordsTypesTemp[element] = 'Language purpose';
            }
          });
          languagesData[obj.id].paradigms.forEach((element: any) => {
            if (!words[element]) {
              words[element] = factor;
              wordsTypesTemp[element] = 'Language paradigm/type';
            } else {
              words[element] += factor;
              wordsTypesTemp[element] = 'Language paradigm/type';
            }
          });
        }
      });
      setWordsTypes(wordsTypesTemp);
      const wordCloudData: any = [];
      const totalWordsTemp = [];
      for (const [key, value] of Object.entries(words)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        totalWordsTemp.push(Number(value));
        wordCloudData.push({
          text: key,
          value: value
        });
      }
      setTotalWords(totalWordsTemp);
      setLangData(wordCloudData);
    });
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px'
      }}>
      <h2>Word Clouds</h2>
      <p>
        A cloud of words related to the top 20 programming languages paradigms, types and purposes
        according to number of <b>commits</b>, <b>pull requests</b> and <b>repositories</b> along
        time.
      </p>
      <div
        style={{
          width: '90vw'
        }}>
        <Carousel variant="dark" interval={null} activeIndex={index} onSelect={handleSelect}>
          {events.map((event, index) => (
            <Carousel.Item key={index}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  paddingBottom: '25px'
                }}>
                <h3>{event}</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <WordCloudChart
                    styles={{ chartContainer }}
                    words={langData}
                    wordsTypes={wordsTypes}
                    totalWords={totalWords}></WordCloudChart>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '-10px'
          }}>
          <RangeSlider
            min={MIN_YEAR}
            max={MAX_YEAR}
            onChange={({ min, max }) => {
              setMin(min);
              setMax(max);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WordCloud;
