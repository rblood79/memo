/* eslint-disable array-callback-return */
//import _ from 'lodash';
import 'remixicon/fonts/remixicon.css'
import React, { useState, useEffect, useContext } from 'react';
import context from '../component/Context';
import { useHistory } from "react-router-dom";
//import { isMobile } from 'react-device-detect';

import { doc, query, where, getDoc, getDocs, orderBy, deleteDoc } from 'firebase/firestore';

const App = (props) => {
  const history = useHistory();
  const state = useContext(context);
  const { user } = state;
  const [data, setData] = useState(null);
  //const [dataF, setDataF] = useState(null);

  const test = (e) => {
    //console.log('시험버전에선 제공되지 않습니다', e.ID, e)
    //history.push('/form',e)
    history.push({
      pathname: '/form',
      state: { userCell: e.ID }
    })
  }

  const onDelete = async (id) => {
    await deleteDoc(doc(props.manage, id), onCheck(id));
  }

  const onCheck = async(id)=>{
    const docRef = doc(props.manage, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log('아직있음')
    }else{
      //console.log('지워짐')
      onLoad();
    }
  }

  const SplitItem = (e) => {
    let data = e ? e.split('\n') : null;
    const result = [];
    data && data.map((item, index) => {
      item && result.push(
        <span key={index} className='splitItem'>{item}</span>
      )
    });
    return result;
  }


  const onLoad = async () => {
    //console.log('load!!!!')
    //setData(null)
    const manageDoc = [];

    const mn = query(props.manage, where("ID", "!=", ""), orderBy("ID", "desc"));
    const manageSnapshot = await getDocs(mn);
    manageSnapshot.forEach((doc) => {
      manageDoc.push({ id: doc.id, ...doc.data() })
    });
    setData(null);
    setData(manageDoc);
  }

  useEffect(() => {
    !user ? history.push('/') : onLoad();
  }, [])

  /*const comma = (str)=> {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }*/

  /*const filterData =(s,e)=>{
    const start = s-1 || 0;
    const end = e-1 || data.length-1;
    const xx = _.filter(data, function(o,index){
      return index >= start && index <= end
    })
    setDataF(xx);
  }*/



  /*useEffect(() => {
    data && console.log('data up!!!!!!', _.filter(data, ['STARTCOMPYEAR', "2014"]))
  }, [data])*/

  /*const [inputs, setInputs] = useState({
    startNum: "",
    endNum: "",
  });
  const { startNum, endNum } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value || "",
    });
  };*/

  return (
    <div className='resultContainer'>

      <div className='users'>
        <div className='resultHead'>
          <h2 className='title'>과제현황<span className='titleSub'>- 전체 {data && data.length}건</span></h2>
        
          
          <button className="refresh" onClick={onLoad}>재조회</button>
        </div>
        <div>

          <div className='tableContents'>
            <table className='table'>
              <colgroup>
                <col width="70px" />
                <col width="110px" />
                <col width="50px" />
                <col width="150px" />
                <col width="60px" />
                <col width="70px" />
                <col width="70px" />
                <col width="70px" />
                <col width="70px" />
                <col width="70px" />
                <col width="70px" />
                <col width="70px" />
                <col width="80px" />
                <col width="40px" />
                <col width="auto" />
                <col width="48px" />
                <col width="84px" />
                <col width="84px" />
                <col width="84px" />
                <col width="84px" />
                <col width="84px" />
                <col width="84px" />
                <col width="0px" />
              </colgroup>
              <thead>
                <tr>
                  <th>관리번호</th>
                  <th>확인번호</th>
                  <th>팀장</th>
                  <th>과제명</th>
                  <th>1차완료<br />평가연도</th>
                  <th>1차완료<br />평가결과</th>
                  <th>2차완료<br />평가연도</th>
                  <th>2차완료<br />평가결과</th>
                  <th>1차성과<br />평가연도</th>
                  <th>1차성과<br />평가결과</th>
                  <th>2차성과<br />평가연도</th>
                  <th>2차성과<br />평가결과</th>

                  <th>재무성과<br />(원)</th>
                  <th>사후<br />관리</th>
                  <th>관리지표</th>
                  <th>단위</th>
                  <th>수치</th>
                  <th>Y+1</th>
                  <th>Y+2</th>
                  <th>Y+3</th>
                  <th>Y+4</th>
                  <th>Y+5</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  data ?
                  Object.entries(data).map((item,index) =>
                    <tr key={item[0] + item[1]} onDoubleClick={() => test(item[1])}>
                      <td>{item[1].ID}</td>
                      <td className='breakAll'>{item[1].CHECKNUM}</td>
                      <td>{item[1].LEADER}</td>
                      <td>{item[1].TITLE}</td>
                      <td>{item[1].STARTCOMPYEAR}</td>
                      <td>{item[1].STARTCOMPRESULT}</td>
                      <td>{item[1].ENDCOMPYEAR}</td>
                      <td>{item[1].ENDCOMPRESULT}</td>
                      <td>{item[1].STARTYEAR}</td>
                      <td>{item[1].STARTRESULT}</td>
                      <td>{item[1].ENDCOMPYEAR}</td>
                      <td>{item[1].ENDRESULT}</td>
                      <td>{item[1].RESULT}</td>
                      <td className='noPadding'><span className={item[1].COLOR === 'red' ? 'redBox' : item[1].COLOR === 'green' ? 'greenBox' : item[1].COLOR === 'yellow' ? 'yellowBox' : 'normalBox'} /></td>

                      <td className='noPadding'><div className='splitGroup'>{SplitItem(item[1].INDI)}</div></td>
                      <td className='noPadding'><div className='splitGroup'>{SplitItem(item[1].UNIT)}</div></td>
                      <td className='noPadding'><div className='splitGroup'>{SplitItem(item[1].DATAY0)}</div></td>
                      <td className='noPadding'><div className='splitGroup'>{SplitItem(item[1].DATAY1)}</div></td>
                      <td className='noPadding'><div className='splitGroup'>{SplitItem(item[1].DATAY2)}</div></td>
                      <td className='noPadding'><div className='splitGroup'>{SplitItem(item[1].DATAY3)}</div></td>
                      <td className='noPadding'><div className='splitGroup'>{SplitItem(item[1].DATAY4)}</div></td>
                      <td className='noPadding'><div className='splitGroup'>{SplitItem(item[1].DATAY5)}</div></td>
                      <td className='delTd' onClick={()=>{onDelete(item[1].ID)}}><i className="ri-close-circle-fill"></i></td>
                    </tr>
                  ) : 
                  <tr>
                  </tr>
                }
              </tbody>
              <tfoot>

              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

App.defaultProps = {
};

export default App;