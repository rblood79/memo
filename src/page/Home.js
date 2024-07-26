
import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import context from '../component/Context';
import mnd from '../assets/logo.svg';

const App = (props) => {
  const [number, setNumber] = useState(null);
  const [pw, setPw] = useState(null);

  const state = useContext(context);
  const { setUser } = state;
  const [view, setView] = useState(false);
  const history = useHistory();

  //let reg_num = /^[0-9]{6,10}$/; // 전화번호 숫자만
  //let regex = /[^0-9]/g;

  const onCheck = async () => {
    if (number === 'admin' && pw === 'admin') {
      setUser(number);
      history.push('/result')
    } else {
      setNumber(null)
      setPw(null)
    }
    //!reg_num.test(idNum) ? setNumber('fail') : !reg_num.test(pw) && setPw('fail');
    /*if (number === 'admin' && pw === 'admin') {
      setUser(number);
      history.push('/result')
    } else if (number && pw !== 'fail' && number === pw) {
      setUser(number.replace(regex, ''));
      history.push('/main')
    } else if (number && pw && number !== pw) {
      setPw('same')
    }*/
  }

  useEffect(() => {
    //console.log(props)
    setNumber(null)
    setPw(null)
    //setArmy(null)
    setUser(null)
  }, [setUser])

  return (
    <div className='container'>
      <div className='login'>
        <div className='visual'>
          <div className='visualText'>
            <div className='textGroup'>
              <span>과</span><span>제</span><span>관</span><span>리</span>
              <span>프</span><span>로</span><span>그</span><span>램</span>
            </div>
            <img className='visualLogo' src={mnd} alt={'logo'} />
          </div>
        </div>
        <div>
          <div className='armyWrap'>
          
                <div className={'input'}>
                  <input className={'id'} type='text' maxLength={12} placeholder="아이디" onChange={({ target: { value } }) => {
                    setNumber(value)
                  }} />
                </div>
                <div className={'input'}>
                  <input className={'pw'} type={view ? 'text' : 'password'} maxLength={12} placeholder="비밀번호" onChange={({ target: { value } }) => {
                    setPw(value)
                  }} />
                  <button className='passView' onClick={()=>{setView(view ? false : true)}}><i className={view ? "ri-eye-off-line" : "ri-eye-line"}></i></button>
                  <span className={'vali'}>{number === null && pw === null ? '아이디와 비밀번호는 관리자에게 문의하세요' : number === 'fail' ? '올바른 아이디가 아닙니다' : pw === 'fail' ? '비밀번호를 입력하세요' : pw === 'same' && '비밀번호가 일치하지 않습니다'}</span>
                </div>
          </div>
          <div className='controll'>
            
                <button className={'button'} onClick={() => {
                  onCheck(number)
                }}>확인</button>
              
          </div>
        </div>
      </div>
    </div>
  );
}

App.defaultProps = {
};

export default App;