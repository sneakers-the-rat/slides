import React from 'react';
import { Deck, Slide, Heading, Text } from 'spectacle';

import SvgAnimator from '../components/svg_animator';

import overview from '../assets/img/schematic-diagram-02.svg';

import anime from 'animejs';

const P2P = (
    <>
    <Heading>
      P2P Overview
    </Heading>
      <Text>
        P2P network example from dissertation
      </Text>
    </>
)

const P2P_Comparison = (
    <>
    <Heading>
      Existing protocols
    </Heading>
      <Text>
        Table comparing Bittorrent, IPFS, etc.
      </Text>
    </>
)

const P2P_LD = (
    <>
    <Heading>
      P2P-LD
    </Heading>
      <Text>
        Whiteboard time sketching the outlines of P2P LD
      </Text>

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

export {P2P, P2P_Comparison, P2P_LD}
