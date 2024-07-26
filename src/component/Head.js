
import React, { useContext } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import context from './Context';
import logo from '../assets/logo.svg';
const App = (props) => {
  const state = useContext(context);
  const history = useHistory();
  const { user, setUser } = state;
  const test = () => {
    //alert('시험버전에선 제공되지 않습니다')
    setUser(null);
  }
  const back = () => {
    history.push('/main')
  }

  return (
    <header className="head">
      <nav className='nav sub'>
        {props.path === '/main' ? <div className='headTitle'><img src={logo} alt='MND'/>과제관리</div> : user === 'admin' ? <div className='headTitle'><img src={logo} alt='MND'/>과제관리프로그램</div> : <button className='navButton back' onClick={back}><i className="ri-arrow-left-s-line"></i></button>}
        
        <div className='navRes'>
          <NavLink className='navButton' exact to="/result"><i className="ri-todo-line"></i>과제목록</NavLink>
          <NavLink className='navButton' exact to="/form"><i className="ri-pencil-line"></i>과제등록</NavLink>
        </div>

        <div className='headRight'>
          <button className='logout' onClick={test} title="로그아웃">Administrator / 관리자<i className="ri-logout-box-r-line"></i></button>
        </div>
      </nav>
    </header>
  );
}
export default App;