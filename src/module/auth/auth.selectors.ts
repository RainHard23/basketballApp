import { AppRootStateType } from '../../core/redux/store'

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
