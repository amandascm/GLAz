import React from 'react';
import Navbar from '../../components/Navbar';
import pages from '../../utils/links';
import './styles.css';
import ImageCard from '../../components/image-card';

function Home() {
  const cards = [
    {
      title: 'Visualizations',
      text: 'Check out data visualizations about the programming languages used on GitHub.',
      link: '/vis',
      imgSrc: '/assets/vis.svg'
    },
    {
      title: 'Analysis Report',
      text: 'Read some insights about data visualizations.',
      link: '/',
      imgSrc: '/assets/report.svg'
    }
  ];
  console.log(cards);
  return (
    <div className="Home">
      <Navbar links={pages} />
      <section className="presentation-section">
        <div className="presentation">
          <img src={'/assets/logo-dark.svg'} className="logo" id="GLAz" alt="logo" />
          <h1>A GitHub Languages Analyzer.</h1>
          <div className="presentation-cards">
            {cards.map((card, index) => (
              <ImageCard key={index} props={card}></ImageCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
