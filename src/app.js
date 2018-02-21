import React from 'react'
import ReactDOM from 'react-dom'
import request from 'superagent'
import moment from 'moment'

class CurrencyExchange extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currencydata:{},
      loaded:false
    }
  }
  componentDidMount(){
    request.get('/jsondata')
    .end((err,data)=>{
      if(data){
        this.setState({currentcydata:JSON.parse(data.body),loaded:true})
      }
      console.log(JSON.parse(data.body))
    })
  }
  render(){
    return(
    <div>
      {this.state.loaded ? <span>자료가 로드되었습니다</span>: <span>아직 자료를 읽고 있습니다</span>}
    </div>
    )
  }
}

ReactDOM.render(<CurrencyExchange />,document.getElementById('root'))