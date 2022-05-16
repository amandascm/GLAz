import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const WordCloudChart = (props: any) => {
  const initialValue = 0;
  const words = props.words ?? [
    {
      text: 'told',
      value: 64
    },
    {
      text: 'mistake',
      value: 11
    },
    {
      text: 'thought',
      value: 16
    },
    {
      text: 'bad',
      value: 17
    }
  ];
  const callbacks = props.callbacks ?? {
    getWordColor: (word: { value: number; text: string }) => {
      return word.value / Math.max(...props.totalWords) < 0.2
        ? '#F5A8C2'
        : word.value / Math.max(...props.totalWords) < 0.4
        ? '#FF88B1'
        : word.value / Math.max(...props.totalWords) < 0.6
        ? '#FC5E94'
        : word.value / Math.max(...props.totalWords) < 0.8
        ? '#E91D63'
        : word.value / Math.max(...props.totalWords) < 1
        ? '#AF164B'
        : '#950C3B';
    },
    getWordTooltip: (word: { value: number; text: string }) =>
      `${word.text} (${(
        (100 * word.value) /
        props.totalWords.reduce(
          (previousValue: any, currentValue: any) => previousValue + currentValue,
          initialValue
        )
      ).toFixed(1)}%): ${props.wordsTypes[word.text]}`
  };

  const options: any = props.options ?? {
    colors: ['#E91D63', '#212529', '#A3A3A3', '#ECACC2'],
    rotations: 0,
    rotationAngles: [0],
    deterministic: true,
    fontFamily: 'Helvetica',
    fontSizes: [16, 40],
    fontWeight: 'bold',
    randomSeed: 23,
    enableTooltip: true
  };
  const size: any = props.size ?? [1000, 400];
  return <ReactWordcloud callbacks={callbacks} options={options} size={size} words={words} />;
};

export default WordCloudChart;
