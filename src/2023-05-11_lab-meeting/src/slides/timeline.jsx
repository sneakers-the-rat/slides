import React from 'react';
import {Heading, Text, UnorderedList, ListItem, Link} from 'spectacle';

const Timeline = (
    <>
      <Heading textAlign={"left"}>
        Knowledge Graphs: Abridged Timeline
      </Heading>
      <Text fontStyle={"italic"}>The Story of Knowledge Graphs is the story of the Enclosure of the Web</Text>

      <UnorderedList>
        <ListItem>Pre 1999 - Internet is Self-Organizing, eg. <Link href={"http://meatballwiki.org/wiki/TourBusStop"}>Wiki Buslines</Link></ListItem>
        <ListItem>1999-ish - Semantic Web vision begins</ListItem>
        <ListItem>2006 - SemWeb -> Linked Data, eg. <Link href={"https://www.w3.org/DesignIssues/LinkedData.html"}>The Four Principles</Link></ListItem>
        <ListItem>2011 - Google acquires Freebase, Knowledge Graphs ensue, eg. <Link href={"https://www.google.com/search?q=UCLA"}>Google's Infoboxes</Link></ListItem>
      </UnorderedList>


    </>
)

export default Timeline
