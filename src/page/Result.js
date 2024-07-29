/* eslint-disable array-callback-return */
//import _ from 'lodash';
import 'remixicon/fonts/remixicon.css'
import React, { useState, useEffect, useContext } from 'react';
import context from '../component/Context';
import { useHistory } from "react-router-dom";
import { isMobile } from 'react-device-detect';

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
  const ItemList =(props) => {
    const item = props.data[1];
    const indiArray = item.INDI ? item.INDI.split('\n') : [];
    const unitArray = item.UNIT ? item.UNIT.split('\n') : [];
    const d0Array = item.DATAY0 ? item.DATAY0.split('\n') : [];
    const d1Array = item.DATAY1 ? item.DATAY1.split('\n') : [];
    const d2Array = item.DATAY2 ? item.DATAY2.split('\n') : [];
    const d3Array = item.DATAY3 ? item.DATAY3.split('\n') : [];
    const d4Array = item.DATAY4 ? item.DATAY4.split('\n') : [];
    const d5Array = item.DATAY5 ? item.DATAY5.split('\n') : [];


    const rspan = indiArray.length > 0 ? indiArray.length : 1;
    return <>
      <tr onDoubleClick={() => test(item)}>
        <td rowSpan={rspan}>{item.ID}</td>
        <td rowSpan={rspan} className='breakAll'>{item.CHECKNUM}</td>
        <td rowSpan={rspan}>{item.LEADER}</td>
        <td rowSpan={rspan}>{item.TITLE}</td>
        <td rowSpan={rspan}>{item.STARTCOMPYEAR}</td>
        <td rowSpan={rspan}>{item.STARTCOMPRESULT}</td>
        <td rowSpan={rspan}>{item.ENDCOMPYEAR}</td>
        <td rowSpan={rspan}>{item.ENDCOMPRESULT}</td>
        <td rowSpan={rspan}>{item.STARTYEAR}</td>
        <td rowSpan={rspan}>{item.STARTRESULT}</td>
        <td rowSpan={rspan}>{item.ENDCOMPYEAR}</td>
        <td rowSpan={rspan}>{item.ENDRESULT}</td>
        <td rowSpan={rspan}>{item.RESULT}</td>
        <td rowSpan={rspan} className='noPadding'><span className={item.COLOR === 'red' ? 'redBox' : item.COLOR === 'green' ? 'greenBox' : item.COLOR === 'yellow' ? 'yellowBox' : 'normalBox'} /></td>
        <td>{indiArray[0]}</td>
        <td>{unitArray[0]}</td>
        <td>{d0Array[0]}</td>
        <td>{d1Array[0]}</td>
        <td>{d2Array[0]}</td>
        <td>{d3Array[0]}</td>
        <td>{d4Array[0]}</td>
        <td>{d5Array[0]}</td>
        <td className='delTd' onClick={()=>{onDelete(item.ID)}}><i className="ri-close-circle-fill"></i></td>
      </tr>
      {indiArray.length > 0 && SplitItem(indiArray, unitArray, d0Array, d1Array, d2Array, d3Array, d4Array, d5Array, item)}
    </>

  }


  const SplitItem = (indi, unit, d0Array, d1Array, d2Array, d3Array, d4Array, d5Array, itemID) => {
    const result = [];
    indi.map((item, index) => {
      index > 0 && result.push(
        <tr key={'list'+index} onDoubleClick={() => test(itemID)}>
          <td>{indi[index]}</td>
          <td>{unit[index]}</td>
          <td>{d0Array[index]}</td>
          <td>{d1Array[index]}</td>
          <td>{d2Array[index]}</td>
          <td>{d3Array[index]}</td>
          <td>{d4Array[index]}</td>
          <td>{d5Array[index]}</td>
        </tr>
      )
    });
    return result;
  }


  const onLoad = async () => {
    //console.log('onLoad')
    //setData(null);
    const manageDoc = [];
    const mn = query(props.manage, where("ID", "!=", ""), orderBy("ID", "desc"));
    const manageSnapshot = await getDocs(mn);
    manageSnapshot.forEach((doc) => {
      manageDoc.push({ id: doc.id, ...doc.data() })
    });

    setData(manageDoc);
  }

  useEffect(() => {
    !user ? history.push('/') : onLoad();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, history])

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
        
          
          <button className="refresh" onClick={onLoad}><i className="ri-restart-line"></i><span>재조회</span></button>
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
                <col width={isMobile ? "234px" : "auto"} />
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
                  data && Object.entries(data).map((item) => <ItemList key={item[0] + item[1]} data={item} />)
                }
              </tbody>
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