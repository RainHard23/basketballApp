import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../core/redux/store'
import { appActions } from '../../module/app/appSlice'
import { useActions } from '../../api/common/hooks/useActions'
import { teamsAction } from '../../module/teams/teamsSlice'
import { ErrorSnackbar2 } from './ErrorSnakBar'

export const ErrorSnackbar: FC = () => {
  const error = useSelector((state: AppRootStateType) => state.app.error)
  const { setAppError } = useActions(appActions)
  const handleClose = (event: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setAppError({ error: null })
  }

  return <ErrorSnackbar2 error={error} onClose={handleClose} />
}
