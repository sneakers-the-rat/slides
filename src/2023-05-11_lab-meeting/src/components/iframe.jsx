import React from 'react';

import {Text, Heading, SlideContext, useSteps} from 'spectacle';

export function IFrame({
                         src,
                         style={width:"100%", height:"100%"}
                       }){
  const { activeStepIndex, isSlideActive } = React.useContext(SlideContext);


  const renderthis =
      <>{isSlideActive && <iframe frameBorder={'0'} className={'iframe-component'} width={"100%"} height={"100%"}  loading={"lazy"} src={src}/>}</>

  return(
      {...renderthis}
  )
}

export default IFrame
