import { useEffect, useState } from 'react';
import ParallelCoordsChart from '../../components/parallel-coords-chart';
import * as d3 from 'd3';
import Slider from '../../components/slider';

export interface ChartData {
  name: string | null;
  commits: number | null;
  repos: number | null;
  prs: number | null;
  style?: any;
}

const LangAttributesParallel = () => {
  const [chartData, setChartData] = useState<ChartData[]>([] as ChartData[]);
  const defaultStyle = {
    strokeWidth: 0.5
  };

  // Slider section
  const quarters = Array.from({ length: 4 }, (_, i) => i + 1).sort(); // array with sorted quarter values [1...4]
  const years = Array.from({ length: 11 }, (_, i) => i + 2011).sort(); // array with sorted year values [2011..2022]

  const cartesian = (...a: any[]) =>
    a.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => [d, e].flat())));
  const yearsQuarters = cartesian(years, quarters); // cartesian product years x quarters

  const sliderValues = yearsQuarters.map((_: any, i: any) => i); // indexes of cartesian product years x quarters
  const [sliderValue, setSliderValue] = useState(Math.max(...sliderValues));
  const sliderLimits = { min: Math.min(...sliderValues), max: Math.max(...sliderValues) };
  const sliderOnChange = (event: any) => {
    const value = event.target.value;
    setSliderValue(value);
    event.target.value = value.toString();
  };
  function sliderLabel(val: number) {
    return `Q${yearsQuarters[val][1]}/${yearsQuarters[val][0]}`;
  }

  // Data section

  useEffect(() => {
    const fetchData = async () => {
      await updateCommitDataSource(
        'data/commits.csv',
        yearsQuarters[sliderValue][0],
        yearsQuarters[sliderValue][1]
      );
      await updateReposDataSource(
        'data/repos.csv',
        yearsQuarters[sliderValue][0],
        yearsQuarters[sliderValue][1]
      );
      await updatePrsDataSource(
        'data/prs.csv',
        yearsQuarters[sliderValue][0],
        yearsQuarters[sliderValue][1]
      );
      setChartData(objects);
      setDomains([
        {
          name: 'commits',
          domain: [
            Math.min(0, Number(domainsLimits.commits.min)),
            1.05 * Math.max(0, Number(domainsLimits.commits.max)) ?? 700000
          ]
        },
        {
          name: 'repos',
          domain: [
            Math.min(0, Number(domainsLimits.repos.min)),
            1.05 * Math.max(0, Number(domainsLimits.repos.max)) ?? 700000
          ]
        },
        {
          name: 'prs',
          domain: [
            Math.min(0, Number(domainsLimits.prs.min)),
            1.05 * Math.max(0, Number(domainsLimits.prs.max)) ?? 700000
          ]
        }
      ]);
    };
    fetchData();
  }, [sliderValue]);

  useEffect(() => {
    // console.log('re-render component');
  }, [chartData]);

  const objects: any[] = [];
  async function updateCommitDataSource(path: string, year: number, quarter: number) {
    return d3.csv(path).then((data: any) => {
      data.map((d: any) => {
        if (d.year == `${year}` && d.quarter == `${quarter}`) {
          const langObject = objects.find((obj) => obj.name === d.language_name);
          if (!domainsLimits.commits.min || Number(d.commit_count) < domainsLimits.commits.min)
            domainsLimits.commits.min = Number(d.commit_count);
          if (!domainsLimits.commits.max || Number(d.commit_count) > domainsLimits.commits.max)
            domainsLimits.commits.max = Number(d.commit_count);
          if (!langObject) {
            objects.push({
              name: d.language_name,
              commits: Number(d.commit_count),
              repos: 0,
              prs: 0,
              style: defaultStyle
            });
          } else {
            objects.map((obj) => {
              if (obj.name === langObject.name) {
                const newObj = langObject;
                newObj.commits = Number(d.commit_count);
                return newObj;
              } else {
                return obj;
              }
            });
          }
        }
      });
    });
  }
  async function updateReposDataSource(path: string, year: number, quarter: number) {
    return d3.csv(path).then((data: any) => {
      data.map((d: any) => {
        if (d.year == `${year}` && d.quarter == `${quarter}`) {
          const langObject = objects.find((obj) => obj.name === d.language_name);
          if (!domainsLimits.repos.min || Number(d.repos_count) < domainsLimits.repos.min)
            domainsLimits.repos.min = Number(d.repos_count);
          if (!domainsLimits.repos.max || Number(d.repos_count) > domainsLimits.repos.max)
            domainsLimits.repos.max = Number(d.repos_count);
          if (!langObject) {
            objects.push({
              name: d.language_name,
              repos: Number(d.repos_count),
              prs: 0,
              commits: 0,
              style: defaultStyle
            });
          } else {
            objects.map((obj) => {
              if (obj.name === langObject.name) {
                const newObj = langObject;
                newObj.repos = Number(d.repos_count);
                return newObj;
              } else {
                return obj;
              }
            });
          }
        }
      });
    });
  }
  async function updatePrsDataSource(path: string, year: number, quarter: number) {
    return d3.csv(path).then((data: any) => {
      data.map((d: any) => {
        if (d.year == `${year}` && d.quarter == `${quarter}`) {
          const langObject = objects.find((obj) => obj.name === d.language_name);
          if (!domainsLimits.prs.min || Number(d.pr_count) < domainsLimits.prs.min)
            domainsLimits.prs.min = Number(d.pr_count);
          if (!domainsLimits.prs.max || Number(d.pr_count) > domainsLimits.prs.max)
            domainsLimits.prs.max = Number(d.pr_count);
          if (!langObject) {
            objects.push({
              name: d.language_name,
              repos: 0,
              prs: d.pr_count,
              commits: 0,
              style: defaultStyle
            });
          } else {
            objects.map((obj) => {
              if (obj.name === langObject.name) {
                const newObj = langObject;
                newObj.prs = d.pr_count;
                return newObj;
              } else {
                return obj;
              }
            });
          }
        }
      });
    });
  }
  const domainsLimits = {
    commits: { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
    repos: { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
    prs: { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY }
  };
  const [domains, setDomains] = useState([
    {
      name: 'commits',
      domain: [1, 2]
    },
    {
      name: 'repos',
      domain: [1, 2]
    },
    {
      name: 'prs',
      domain: [1, 2]
    }
  ]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px'
      }}>
      <h2>Programming Languages Attributes</h2>
      <p>
        A parallel coordinates chart representing the number of <b>commits</b>, <b>pull requests</b>{' '}
        and <b>repositories</b> per programming language.
      </p>
      <ParallelCoordsChart domains={domains} data={chartData}></ParallelCoordsChart>
      <p>Select a quarter of a year between 2011 and 2021:</p>
      <Slider
        minValue={sliderLimits.min}
        maxValue={sliderLimits.max}
        value={sliderValue}
        label={sliderLabel}
        onChange={sliderOnChange}></Slider>
    </div>
  );
};

export default LangAttributesParallel;
