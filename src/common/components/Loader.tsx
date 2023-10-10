import React from 'react'

import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoaderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`

const Spinner = styled.div`
  border: 4px solid red; /* Красный цвет */
  border-top: 4px solid transparent;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const Loader = () => {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  )
}
