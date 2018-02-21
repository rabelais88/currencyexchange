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

class CurrencyExchange extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      rawcurrencydata:{},
      filtereddata:{},
      loading:true
    }
  }
  componentDidMount(){
    request.get('/jsondata')
    .end((err,data)=>{
      if(data){
        const rawdata = JSON.parse(data.body)
        const filtered = rawdata.filter(el=>{
          return el.cur_unit === 'CNH' || el.cur_unit === 'USD' || el.cur_unit === 'EUR' || el.cur_unit === 'JPY(100)'
        })
        this.setState({rawcurrentcydata:rawdata,loading:false,filtereddata:filtered})
        console.log(rawdata)
        console.log('filtered',filtered)
      }
    })
  }
  render(){
    if(this.state.loading){
      return(
        <MuiThemeProvider>
          <div>아직 자료를 읽고 있습니다</div>
        </MuiThemeProvider>
      )
    }else{
      return(
        <MuiThemeProvider>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>코드명</TableHeaderColumn>
                <TableHeaderColumn>이름</TableHeaderColumn>
                
              </TableRow>
            </TableHeader>
            <TableBody>
            {this.state.filtereddata.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
              </TableRow>
              ))}
            </TableBody>
          </Table>
          <div>{this.state.loading ?  <span>아직 자료를 읽고 있습니다</span>: <span>자료가 로드되었습니다</span>}</div>
        </MuiThemeProvider>
      )
    }
  }
}

ReactDOM.render(<CurrencyExchange />,document.getElementById('root'))