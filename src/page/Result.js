/* eslint-disable array-callback-return */
//import _ from 'lodash';
import 'remixicon/fonts/remixicon.css'
import React, { useState, useEffect, useContext, useRef } from 'react';
import context from '../component/Context';
import { useHistory } from "react-router-dom";
import { isMobile } from 'react-device-detect';

import { doc, query, where, getDoc, getDocs, orderBy, deleteDoc } from 'firebase/firestore';
import moment from "moment";

const App = (props) => {
  const history = useHistory();
  const state = useContext(context);
  const { user } = state;
  const [data, setData] = useState(null);

  const tableRef = useRef();
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

  const onCheck = async (id) => {
    const docRef = doc(props.manage, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log('아직있음')
    } else {
      //console.log('지워짐')
      onLoad();
    }
  }
  const style = {
    table: {
      width: "100%",
      height: "1px",
      borderCollapse: "collapse",
      border: "2px solid #000",
      backgroundColor: "#fff",
      fontSize: "12px",
      tableLayout: "fixed",
      th: {
        background: "#efefef",
        border: isMobile ? "1px solid #d3d3d3" : "0.5pt solid #d3d3d3",
        fontWeight: "400",
        padding: "6px 4px",
        height: "51px",
        minHeight: "51px",
        wordBreak: "keep-all",
        borderBottom: isMobile ? "1px solid #ccc" : "0.5pt solid #ccc"
      },
      thE: {
        width: isMobile ? "0pt" : "0.5pt",
      },
      td: {
        border: isMobile ? "1px solid #d3d3d3" : "0.5pt solid #d3d3d3",
        fontWeight: "400",
        padding: "6px 4px",
        height: "51px",
        minHeight: "51px",
        wordBreak: "keep-all",
        textAlign: "center",
      },
      tdB: {
        border: isMobile ? "1px solid #d3d3d3" : "0.5pt solid #d3d3d3",
        fontWeight: "400",
        padding: "6px 4px",
        height: "51px",
        minHeight: "51px",
        wordBreak: "break-all",
        textAlign: "center",
      },
      tdRed: {
        background: "#D01414",
      },
      tdGreen: {
        background: "#20D067",
      },
      tdYellow: {
        background: "#EFD214",
      },
      tdNormal: {
        background: "#efefef",
      }
    }
  }

  const ItemList = (props) => {
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
      <tr onDoubleClick={() => !isMobile && test(item)}>
        <td rowSpan={rspan} style={style.table.td}>{item.ID}</td>
        <td rowSpan={rspan} style={style.table.tdB}>{item.CHECKNUM}</td>
        <td rowSpan={rspan} style={style.table.td}>{item.LEADER}</td>
        <td rowSpan={rspan} style={style.table.td}>{item.TITLE}</td>
        <td rowSpan={rspan} style={style.table.td}>{item.STARTCOMPYEAR}</td>
        <td rowSpan={rspan} style={style.table.td}>{item.STARTCOMPRESULT}</td>
        <td rowSpan={rspan} style={style.table.td}>{item.ENDCOMPYEAR}</td>
        <td rowSpan={rspan} style={style.table.td}>{item.ENDCOMPRESULT}</td>
        <td rowSpan={rspan} style={style.table.td}>{item.STARTYEAR}</td>
        <td rowSpan={rspan} style={style.table.td}>{item.STARTRESULT}</td>
        <td rowSpan={rspan} style={style.table.td}>{item.ENDCOMPYEAR}</td>
        <td rowSpan={rspan} style={style.table.td}>{item.ENDRESULT}</td>
        <td rowSpan={rspan} style={style.table.td}>{item.RESULT}</td>
        <td rowSpan={rspan} style={item.COLOR === 'red' ? style.table.tdRed : item.COLOR === 'green' ? style.table.tdGreen : item.COLOR === 'yellow' ? style.table.tdYellow : style.table.tdNormal}></td>
        <td style={style.table.td}>{indiArray[0]}</td>
        <td style={style.table.td}>{unitArray[0]}</td>
        <td style={style.table.td}>{d0Array[0]}</td>
        <td style={style.table.td}>{d1Array[0]}</td>
        <td style={style.table.td}>{d2Array[0]}</td>
        <td style={style.table.td}>{d3Array[0]}</td>
        <td style={style.table.td}>{d4Array[0]}</td>
        <td style={style.table.td}>{d5Array[0]}</td>
        {isMobile ? <td className='delTd' onClick={() => { test(item) }}><i className="ri-edit-circle-fill"></i></td> : <td className='delTd' onClick={() => { onDelete(item.ID) }}><i className="ri-close-circle-fill"></i></td>}
      </tr>
      {indiArray.length > 0 && SplitItem(indiArray, unitArray, d0Array, d1Array, d2Array, d3Array, d4Array, d5Array, item)}
    </>

  }


  const SplitItem = (indi, unit, d0Array, d1Array, d2Array, d3Array, d4Array, d5Array, itemID) => {
    const result = [];
    indi.map((item, index) => {
      index > 0 && result.push(
        <tr key={'list' + index} onDoubleClick={() => !isMobile && test(itemID)}>
          <td style={style.table.td}>{indi[index]}</td>
          <td style={style.table.td}>{unit[index]}</td>
          <td style={style.table.td}>{d0Array[index]}</td>
          <td style={style.table.td}>{d1Array[index]}</td>
          <td style={style.table.td}>{d2Array[index]}</td>
          <td style={style.table.td}>{d3Array[index]}</td>
          <td style={style.table.td}>{d4Array[index]}</td>
          <td style={style.table.td}>{d5Array[index]}</td>
          <td></td>
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

  const onDownload = async () => {
    let xData = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    xData += '<head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    xData += '<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
    xData += '<x:Name>DATA Sheet</x:Name>';
    xData += '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
    xData += '</x:ExcelWorksheets></x:ExcelWorkbook></xml>';
    xData += '</head><body>';
    xData += tableRef.current.outerHTML;
    xData += '</body></html>';

    let fileName = moment(new Date()).format("YYYYMMDD");
    let blob = new Blob([xData], {
      type: "application/csv;charset=utf-8;"
    });
    let a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "과제관리" + fileName + ".xls";
    a.click();
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
          <div className='resultRight'>
            {!isMobile && <button className="refresh" onClick={onDownload}><i className="ri-file-excel-2-line"></i><span>엑셀다운</span></button>}
            <button className="refresh" onClick={onLoad}><i className="ri-restart-line"></i><span>재조회</span></button>
          </div>
        </div>
        <div>

          <div className='tableContents'>
            <table ref={tableRef} style={style.table}>
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
                  <th style={style.table.th}>관리번호</th>
                  <th style={style.table.th}>확인번호</th>
                  <th style={style.table.th}>팀장</th>
                  <th style={style.table.th}>과제명</th>
                  <th style={style.table.th}>1차완료<br />평가연도</th>
                  <th style={style.table.th}>1차완료<br />평가결과</th>
                  <th style={style.table.th}>2차완료<br />평가연도</th>
                  <th style={style.table.th}>2차완료<br />평가결과</th>
                  <th style={style.table.th}>1차성과<br />평가연도</th>
                  <th style={style.table.th}>1차성과<br />평가결과</th>
                  <th style={style.table.th}>2차성과<br />평가연도</th>
                  <th style={style.table.th}>2차성과<br />평가결과</th>

                  <th style={style.table.th}>재무성과<br />(원)</th>
                  <th style={style.table.th}>사후<br />관리</th>
                  <th style={style.table.th}>관리지표</th>
                  <th style={style.table.th}>단위</th>
                  <th style={style.table.th}>수치</th>
                  <th style={style.table.th}>Y+1</th>
                  <th style={style.table.th}>Y+2</th>
                  <th style={style.table.th}>Y+3</th>
                  <th style={style.table.th}>Y+4</th>
                  <th style={style.table.th}>Y+5</th>
                  <th style={style.table.thE}></th>
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