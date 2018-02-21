import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import request from 'superagent'
import moment from 'moment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import basictheme from './basictheme.css'
import TextField from 'material-ui/TextField'

class CurrencyExchange extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      rawcurrencydata:{},
      filtereddata:{},
      loading:true,
      taxratio:1,
      curdate:moment()
    }
    this.changeTax = this.changeTax.bind(this)
  }
  componentDidMount(){
    request.get('/jsondata')
    .end((err,data)=>{
      if(data){
        const rawdataX = JSON.parse(data.body)
        const rawdata = rawdataX.jsondata
        const curdate = rawdataX.curdate
        console.log(rawdataX)
        const filtered = rawdata.filter(el=>{
          return el.cur_unit === 'CNH' || el.cur_unit === 'USD' || el.cur_unit === 'EUR' || el.cur_unit === 'JPY(100)'
        })
        this.setState({curdate:curdate,rawcurrentcydata:rawdata,loading:false,filtereddata:filtered})
        console.log('filtered',filtered)
      }
    })
  }

  changeTax(e){
    e.preventDefault()
    if(Number.isInteger(Math.round(e.target.value))){
      if(Math.round(e.target.value) < 100 && Math.round(e.target.value) > 0){
        this.setState({taxratio:e.target.value})
      }
    } 
  }

  render(){
    if(this.state.loading){
      return(
        <MuiThemeProvider>
          <div className={basictheme.warning}>아직 자료를 읽고 있습니다</div>
        </MuiThemeProvider>
      )
    }else if(moment().hours() < 11){
      return(
        <MuiThemeProvider>
          <div className={basictheme.warning}>
            <p>11시 이후에 다시 시도해 주세요.</p>
            <hr/>
            <p>한국공공데이터포털(www.data.go.kr) 기준 자료공개 시각은 오전 11시 이후부터입니다.</p>
          </div>
        </MuiThemeProvider>
      )
    }else{
      return(
        <MuiThemeProvider>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>코드명</TableHeaderColumn>
                  <TableHeaderColumn>이름</TableHeaderColumn>
                  <TableHeaderColumn>팔때 가격</TableHeaderColumn>
                  <TableHeaderColumn>계산후 가격</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
              {this.state.filtereddata.map( (row, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{row.CUR_UNIT}</TableRowColumn>
                  <TableRowColumn>{row.CUR_NM}</TableRowColumn>
                  <TableRowColumn>{row.DEAL_BAS_R}</TableRowColumn>
                  <TableRowColumn>{(row.DEAL_BAS_R * (100 - this.state.taxratio)).toFixed(2)}</TableRowColumn>
                </TableRow>
                ))}
              </TableBody>
            </Table><br />
            <TextField hintText="수수료 비율을 100미만의 숫자로 입력해 주세요" floatingLabelText="수수료 기준(%)" value={this.state.taxratio} onChange={changeTax}/><br />
            <h1>x{this.state.taxratio}%</h1>
          </div>
        </MuiThemeProvider>
      )
    }
  }
}

ReactDOM.render(<CurrencyExchange />,document.getElementById('root'))