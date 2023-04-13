import React from 'react';
import { Deck, Slide, Progress } from 'spectacle';

import Surveillance from './slides/surveillance.jsx';
import Timeline from './slides/timeline.jsx';
import P2P from './slides/p2p.jsx';

const slides = [Surveillance, P2P, Timeline]

const theme = {
  colors: {
    primary: '#000000',
    secondary: '#021c3e',
    tertiary: '#ecdcfd',
    quaternary: '#5d51ff',
    quinary: '#8bddfd'
  },
  fonts: {
    header: '"EB Garamond", "Helvetica Neue", Helvetica, Arial, sans-serif',
    text: '"Source Serif Pro", "Helvetica Neue", Helvetica, Arial, sans-serif'
  },
  fontSizes: {
    h1: '72px',
    h2: '64px'
  },
  space: [6, 6, 36]
};

const transition = {
  from: {opacity: 0},
  enter: {opacity: 1},
  leave: {opacity: 0}
}


function Presentation(){
  return (
      <Deck theme={theme}>

        {slides.map((slide, i) =>
        <Slide >
          { slide }
        </Slide>
        )}
      </Deck>
  );
}

export default Presentation
