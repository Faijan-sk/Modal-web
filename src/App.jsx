import { Suspense, useState } from 'react'
import './App.css'

import './index.css'
import  AppRouter from "./router/AppRouter"
function App() {


  return (
    <>
     <Suspense fallback={'Loading...'}>
      <AppRouter/>
    </Suspense>
    </>
  )
}

export default App
