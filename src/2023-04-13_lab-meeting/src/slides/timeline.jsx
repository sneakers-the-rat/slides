import React from 'react';
import { Deck, Slide, Heading } from 'spectacle';

import skull  from '../assets/img/skull.gif';

const Timeline = (
    <>
    <Heading textAlign={"left"} fontFamily={'"Times New Roman", "Times", serif'} fontWeight={"normal"}>
      Coming Soon:
    </Heading>

      <Heading style={
        {
          fontFamily:"Courier New, monospace",

          backgroundColor:"#111",
          color:"#f00"
        }}>The Institute of Pirate Technology
      </Heading>
      <span style={{
        fontFamily:'"Times New Roman", Times, serif',
        fontSize: "3em",
        position:'absolute',
        left: "5%",
        bottom: "20%",
        transform: 'rotate(-30deg)'
      }}>
        "It's about information freedom<br/>not free information"
      </span>


    <img src={skull} style={
      {
        zIndex:"-999",
        position:"absolute",
        width:"70%",
        right:"10%",
        margin:"auto"
      }}/>
      <a href={"https://piracy.solutions"} style={
        {
          fontSize: "5em",
          position:"absolute",
          bottom: "20%",
          left: "40%",
        }
      }>https://piracy.solutions</a>
    </>
)

export default Timeline
