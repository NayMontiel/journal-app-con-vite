import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRouter } from '../auth/router/AuthRouter'
import { useCheckAuth } from '../hooks'
import { JournalRouter } from '../journal/routes/JournalRouter'
import { CheckingAuth } from '../ui'


export const AppRouter = () => {

  const {status} = useCheckAuth();
  
  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
    <Routes>

      {
        (status === 'authenticated')
        ? <Route path='/*' element={<JournalRouter />} />
        : <Route path='/auth/*' element={<AuthRouter />} />
      }
        

        <Route path='/*' element={<Navigate to='/auth/login' /> } />

        
    </Routes>
  )
}
