import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './layout/Header.tsx'
import JobPage from './pages/JobPage.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import JobDetailPage from './pages/JobDetailPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import JobLogin from './pages/JobLogin.tsx'
import ProtectedRoute from './pages/ProtectedRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Header/>

      <Routes>
        <Route>
          <Route path='/login' element={<JobLogin />}></Route>
        </Route>

        <Route element={<ProtectedRoute/>}>
          <Route path='/' element={<JobPage/>}></Route>
          <Route path='/jobs/:id' element={<JobDetailPage/>}></Route>
          <Route path='/profile' element={<ProfilePage/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>
)
