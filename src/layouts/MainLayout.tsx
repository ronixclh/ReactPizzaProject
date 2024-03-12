import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

//sozdanije layouta cherez Outlet, eto dlja togo chtobi sohranatj elementi kotorije ne menjajutsja vne savizimosti ot routa

const MainLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
