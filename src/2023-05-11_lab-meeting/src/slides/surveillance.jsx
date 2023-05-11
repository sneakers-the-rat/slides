import React from 'react';
import { Text, Heading, Link, FlexBox, Box, UnorderedList, ListItem } from 'spectacle';

const Surveillance = (
  <>

    <FlexBox flexDirection={"row"} width={"100%"} height={"100%"} alignItems={"start"}>

      <Box width={"50%"}>
    <Heading textAlign={"left"} fontWeight={800}>
      Surveillance Graphs
    </Heading>
        <Link fontSize={"2em"}
              margin={"0px 12px"}
              href={"https://jon-e.net/surveillance-graphs/"}>
          https://jon-e.net/surveillance-graphs/
        </Link>
    <Text fontStyle={"italic"} margin={"12px 0px"}>
      Linked Data Infrastructures Meet LLMs, Surveillance Ensues
    </Text>
        <UnorderedList fontFamily={"Helvetica"} fontWeight={"200"}>
          <ListItem>Semantic Web Enclosure!</ListItem>
          <ListItem>Misguided Public Data Infrastructures!</ListItem>
          <ListItem>Cloud Orthodoxy!</ListItem>
          <ListItem>What Are The Chatbots For!?</ListItem>
          <ListItem>Vulgar Linked Data as an Alternative!</ListItem>
        </UnorderedList>

      </Box>
      <Box width={"50%"} height={"100%"}>
        <iframe  width={"100%"} height={"100%"}  loading={"lazy"} src={"https://jon-e.net/surveillance-graphs"}/>
      </Box>
    </FlexBox>

  </>

)

export default Surveillance
