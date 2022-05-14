import React from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import { ParallelCoordinates } from 'react-vis';

const ParallelCoordsChart = (props: any) => {
  const w = window.screen.availWidth;
  const h = window.screen.availHeight;
  const dimensions = props?.dimensions ?? { width: 0.9 * w, height: 0.5 * h };
  const domains = props?.domains ?? [
    { name: 'mileage', domain: [8, 10] },
    { name: 'price', domain: [5, 7] },
    { name: 'safety', domain: [8, 10] }
  ];
  const data: any = props?.data ?? [
    {
      name: 'Honda',
      mileage: 8,
      price: 5,
      safety: 9,
      style: {
        strokeWidth: 3
      }
    },
    {
      name: 'Hondaa',
      mileage: 9,
      price: 6,
      safety: 8,
      style: {
        strokeWidth: 2
      }
    },
    {
      name: 'Honda',
      mileage: 10,
      price: 7,
      safety: 10,
      style: {
        strokeWidth: 3
      }
    }
  ];
  return (
    <div>
      <ParallelCoordinates
        showMarks={true}
        brushing={true}
        domains={domains}
        width={dimensions.width}
        height={dimensions.height}
        data={data}
        margin={{ left: 10, right: 10, top: 50, bottom: 10 }}
        style={{
          axes: {
            line: {},
            ticks: {},
            text: { size: 100 }
          },
          labels: {
            fontSize: 10
          },
          line: {
            strokeOpacity: 1
          },
          deselectedLineStyle: {
            strokeOpacity: 0.1
          }
        }}
      />
    </div>
  );
};

export default ParallelCoordsChart;
