import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { appActions } from '../../module/app/appSlice'
import { useActions } from '../../api/common/hooks/useActions'
import { ErrorSnackbar2 } from './ErrorSnakBar'
import { selectAppError } from '../../module/app/appSelectors'

export const ErrorSnackbar: FC = () => {
  const error = useSelector(selectAppError)
  const { setAppError } = useActions(appActions)

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setAppError({ error: null })
  }

  return <ErrorSnackbar2 error={error} onClose={handleClose} />
}
