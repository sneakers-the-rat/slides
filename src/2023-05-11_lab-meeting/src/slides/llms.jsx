import React from 'react';
import {Heading, Text, FlexBox, Box, UnorderedList, ListItem, Image} from 'spectacle';

import rethinkingsearch from '../assets/img/rethinking_search_f1-01.png';

const ALMs = (
    <>
      <Heading textAlign={"left"}>
        Augmented Language Models
      </Heading>
      <iframe width={"100%"} height={"100%"}
              src="https://www.youtube.com/embed/Bf-dbS9CcRU"
              title="YouTube video player" frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen></iframe>


    </>
)

const Harms = (
    <>
    <Heading>
      A New Kind of Surveillance Capitalism
    </Heading>
      <FlexBox style={{width: "100%", height:"100%"}}>
        <Box style={{width: "50%", height:"100%"}}>
          <Text>Surveillance</Text>
          <UnorderedList>
            <ListItem>Integration of assistants, search, apps, OS</ListItem>
            <ListItem>Personal, Contextual, and Global Surveillance</ListItem>
            <ListItem>A more Intimate Surveillance...</ListItem>
            <ListItem>eg. SPOKE</ListItem>
          </UnorderedList>
        </Box>
        <Box style={{width: "50%", height:"100%"}}>
          <Text>Concentration of Power</Text>
          <Image src={rethinkingsearch} style={{width: "90%", height: "70%"}}/>
        </Box>
      </FlexBox>
    </>
)

export {ALMs, Harms}
