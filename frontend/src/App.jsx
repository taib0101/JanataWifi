import { memo } from "react"
import { SubApp } from "./SubApp.jsx"

const App = () => {

  return (
    <>
      <SubApp />
    </>
  )
}

export default memo(App);

