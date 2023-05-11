import React from 'react';
import { Deck, Slide, Heading, Text, Link, UnorderedList, ListItem } from 'spectacle';

import SvgAnimator from '../components/svg_animator';

import overview from '../assets/img/schematic-diagram-02.svg';

import anime from 'animejs';
import {List} from '@mui/material';

const P2P = (
    <>
    <Heading>
      P2P Overview
    </Heading>
      <Text>
        Not enough time to port slide, see <Link href={"https://jon-e.net/dissertation/slides/?slideIndex=21&stepIndex=0"} >prior presentation</Link>
      </Text>
    </>
)

const P2P_Comparison = (
    <>
    <Heading>
      Existing protocols (whiteboard)
    </Heading>
      <Text>

      </Text>
    </>
)

const P2P_LD = (
    <>
    <Heading>
      P2P-LD
    </Heading>
      <UnorderedList>
        <ListItem>
          Merkle DAGs + Scoping
        </ListItem>
        <ListItem>
          Capability-based security
        </ListItem>
        <ListItem>
          P2P Schemas and forking
        </ListItem>
        <ListItem>
          Backwards-compatibility with Bittorrent, IPFS, ActivityPub
        </ListItem>
        <ListItem>
          The Continuation of the SOLID project
        </ListItem>
      </UnorderedList>

    </>
)

const P2P_LD2 = (
    <>
      <Heading>
        P2P-LD (whiteboard)
      </Heading>

    </>
)

const Interfaces = (
    <>
    <Heading>Interfaces</Heading>
    <Text>Also see <Link href={"https://jon-e.net/dissertation/slides/?slideIndex=40&stepIndex=0"}>Prior presentation</Link></Text>
    </>
)

const P2P_System = (
    <div title={"Schematic Overview 1"}>
      <SvgAnimator
          svgUrl={overview}
          steps = {[
            [
              {
                targets:'#schematic-1 #data *',
                opacity: [0,1],
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: () => (anime.random(500, 1000)),
                delay: () => (anime.random(0,1000))
              },
              {
                targets:'#schematic-1 #nwb *',
                opacity: [0,1],
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: () => (anime.random(500, 1000)),
                delay: () => (anime.random(0,1000))
              },
              {
                targets:'#schematic-1 #data_x5F_sharing *',
                opacity: [0,1],
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: () => (anime.random(500, 1000)),
                delay: () => (anime.random(0,1000))
              }],
              [
              {
                targets:'#schematic-1 #communication',
                opacity: [0,1],
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: () => (anime.random(500, 1000)),
                delay: () => (anime.random(0,1000))
              },
              {
                targets:'#schematic-1 #communication',
                opacity: [0,1],
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: () => (anime.random(500, 1000)),
                delay: () => (anime.random(0,1000))
              },
              {
                targets:'#schematic-1 #knowledge',
                opacity: [0,1],
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: () => (anime.random(500, 1000)),
                delay: () => (anime.random(0,1000))
              },
              {
                targets:'#schematic-1 #Experiment *',
                opacity: [0,1],
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: () => (anime.random(500, 1000)),
                delay: () => (anime.random(0,1000))
              },
              {
                targets:'#schematic-1 #pipline *',
                opacity: [0,1],
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: () => (anime.random(500, 1000)),
                delay: () => (anime.random(0,1000))
              },
              {
                targets:'#schematic-1 #technical_x5F_collab *',
                opacity: [0,1],
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: () => (anime.random(500, 1000)),
                delay: () => (anime.random(0,1000))
              },
              {
                targets:'#schematic-1 #autopilot *',
                opacity: [0,1],
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: () => (anime.random(500, 1000)),
                delay: () => (anime.random(0,1000))
              },
            ],
            [
              {
                targets:'#schematic-1 #data_1_ *',
                opacity: [0,1],
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: () => (anime.random(500, 1000)),
                delay: () => (anime.random(0,500))
              }
            ],
            [
              {
                targets:'#schematic-1 #knowledge_1_ *',
                opacity: [0,1],
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: () => (anime.random(500, 1000)),
                delay: () => (anime.random(0,500))
              },

            ],
            [
              {
                targets:'#schematic-1 #tools *',
                opacity: [0,1],
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: () => (anime.random(500, 1000)),
                delay: () => (anime.random(0,500))
              },

            ],
                [
                {
                  targets:'#schematic-1 #timeline *',
                  opacity: [0,1],
                  strokeDashoffset: [anime.setDashoffset, 0],
                  duration: () => (anime.random(500, 1000)),
                  delay: () => (anime.random(0,500))
                },

                ]
          ]}
          id={'schematic-1'}
      />
    </div>
)

export {P2P, P2P_Comparison, P2P_LD, P2P_LD2, Interfaces}
