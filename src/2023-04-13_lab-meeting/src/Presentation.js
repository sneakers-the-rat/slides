import React from 'react';
import { Deck, Slide, Heading } from 'spectacle';

import Surveillance from './slides/surveillance.jsx';


function Presentation(){
  return (
      <Deck>
        <Slide>
          { Surveillance }
        </Slide>
      </Deck>
  );
}

export default Presentation
