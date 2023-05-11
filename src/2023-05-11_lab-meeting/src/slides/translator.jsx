import React from 'react';
import {Heading, Text, Image} from 'spectacle';
import IFrame from '../components/iframe.jsx';

import translator from '../assets/img/translator.png';

const Translator = (
    <>
      <Heading textAlign={"left"}>
        NIH: Biomedical Translator
      </Heading>
      <Image src={translator} style={{height:"80%", width:"80%"}}/>


    </>
)

const Arax = (
    <>
      <Heading textAlign={"left"}>
        ARAX
      </Heading>
      <IFrame src={"https://arax.rtx.ai/"}></IFrame>


    </>
)

export {Translator, Arax}
