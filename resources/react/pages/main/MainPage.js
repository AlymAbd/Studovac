import React from 'react'
import { Main } from './layout'
import Achievements from '../../models/achievements'
import FormMaker from './layout/FormMaker'

const DefaultLayout = () => {
  return (
    <Main>
      <div className="body flex-grow-1 px-3">
        <FormMaker model={Achievements} />
      </div>
    </Main>
  )
}

export default DefaultLayout
