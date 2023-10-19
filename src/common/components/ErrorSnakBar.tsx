import React, { FC, ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import { colors } from '../../assests/styles/colors'

type AlertProps = {
  severity: 'error' | 'success'
  onClick: (event: React.SyntheticEvent) => void
  children: ReactNode
}

const AlertContainer = styled.div<{ severity: 'error' | 'success' }>`
  background-color: ${props => (props.severity === 'error' ? colors.lightestRed : 'green')};
  color: ${colors.white};
  padding: 8px 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  max-width: 480px;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`

const Alert: FC<AlertProps> = ({ severity, onClick, children }) => {
  return (
    <AlertContainer severity={severity} onClick={onClick}>
      {children}
    </AlertContainer>
  )
}

type SnackbarProps = {
  children: ReactNode
}

const SnackbarContainer = styled.div`
  position: fixed;
  top: 30px;
  right: 20px;
`

const Snackbar: FC<SnackbarProps> = ({ children }) => {
  return <SnackbarContainer>{children}</SnackbarContainer>
}

type ErrorSnackbarProps = {
  error: string | null
  onClose: any
}

export const ErrorSnackbar2: FC<ErrorSnackbarProps> = ({ error, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  useEffect(() => {
    if (error) {
      setIsVisible(true)
      if (error.includes('401')) {
        setErrorMessage('User with the specified username / password was not found.')
      } else if (error.includes('409')) {
        setErrorMessage('User already exists')
      } else {
        setErrorMessage(error)
      }
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose()
      }, 6000)

      return () => clearTimeout(timer)
    }
  }, [error, onClose])

  const handleSnackbarClose = () => {
    setIsVisible(false)
    onClose()
  }

  return isVisible ? (
    <Snackbar>
      <Alert severity="error" onClick={handleSnackbarClose}>
        {errorMessage}
      </Alert>
    </Snackbar>
  ) : null
}
