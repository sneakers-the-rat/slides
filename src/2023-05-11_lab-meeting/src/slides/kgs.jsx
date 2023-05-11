import React from 'react';
import {Heading, Text, Image} from 'spectacle';
import IFrame from '../components/iframe.jsx';

import relx from '../assets/img/personaldata.png';

const KGs = (
    <>
      <Heading textAlign={"left"}>
        Knowledge Graphs: Example
      </Heading>
      <IFrame src={"http://en.lodlive.it/?http%3A%2F%2Fdbpedia.org%2Fresource%2FThe_Lord_of_the_Rings"}/>



    </>
)

const Schema = (
    <>
      <Heading textAlign={"left"}>
        Knowledge Graphs: Schema
      </Heading>
      <IFrame src={"https://schema.org/Person"}/>



    </>
)

const RELX = (
    <>
      <Heading textAlign={"left"}>
        Your Friendly Neighborhood Publisher...
      </Heading>
      <Image src={relx} style={{height:"80%", position:"relative", margin:"auto", display:"block"}}/>
    </>
)

export { KGs, Schema, RELX }
