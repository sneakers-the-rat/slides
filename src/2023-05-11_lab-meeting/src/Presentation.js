import React from 'react';
import { Deck, Slide, Progress } from 'spectacle';

import Timeline from './slides/timeline.jsx';
import {KGs, Schema, RELX} from './slides/kgs.jsx';
import {Translator, Arax} from './slides/translator.jsx';
import Cloud from './slides/cloud.jsx';
import {ALMs, Harms} from './slides/llms.jsx';
import SG_ETC from './slides/etc.jsx';
import {P2P, P2P_Comparison, P2P_LD, P2P_LD2, Interfaces} from './slides/p2p.jsx';

import Surveillance from './slides/surveillance.jsx';
import Ipt from './slides/ipt.jsx';
// import P2P from './slides/p2p.jsx';


const slides = [Timeline, KGs, Schema, RELX, Translator, Arax, Cloud, ALMs, Harms, SG_ETC, P2P, P2P_Comparison, P2P_LD, P2P_LD2, Interfaces]

const theme = {
  colors: {
    primary: '#000000',
    secondary: '#021c3e',
    tertiary: '#ffffff',
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
        <Slide key={`slide-${i}`}>
          { slide }
        </Slide>
        )}
        <Progress/>
      </Deck>
  );
}

export default Presentation
