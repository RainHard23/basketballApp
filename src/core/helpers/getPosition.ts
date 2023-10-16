import { useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'

import { playersPositionSelector } from '../../module/players/playersSelectors'
import { useActions } from '../../api/common/hooks/useActions'
import { playersThunks } from '../../module/players/playersSlice'

export const usePlayerPositions = () => {
  const position = useSelector(playersPositionSelector)
  const { getPositionPlayerTC } = useActions(playersThunks)
  useEffect(() => {
    getPositionPlayerTC()
  }, [getPositionPlayerTC])

  const optionsPositions = useMemo(
    () =>
      position &&
      position.map(el => ({
        value: el,
        label: el.replace(/([A-Z][a-z]+)/g, '$1 ').trim(),
      })),
    [position]
  )

  return { position, positionOptions: optionsPositions }
}
