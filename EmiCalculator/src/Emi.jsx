import { useState } from 'react'
import './Emi.css'

export default function Emi(){

    const [buttonAction,setButtonAction] = useState('CalculateEMI')
    const [emiform,setEMIform] = useState({
        loanAmount:'0',
        rateOfInterest:'0.00',
        tenure:'8'
    })
    const handlechange=(event)=>{
     const{name,value} = event.target 
     setEMIform({
        ...emiform,
        [name]:value
     }) 
    } 
  const onCalculateEMI = (event)=>{
    event.preventDefault( )
    setButtonAction('Calculating.....')
    setTimeout(() => {
        let loan = Number(emiform.loanAmount)
        let rate = Number(emiform.rateOfInterest)
        let time = Number(emiform.tenure)
        let temp = (loan*(rate/100))
        let emi = (loan+temp)/time
        setButtonAction(`EMI:${emi.toFixed(2)}/month`);
    }, 2500);
  }
    return(<>
    <div className="container">
        <div className="box">
            <form onSubmit={onCalculateEMI}>
                <h2>EMI Calculator</h2>
                <div className="input-field">
                    <label>loanAmount</label>
                    <input type="number" name='loanAmount' onChange={handlechange}></input>
                </div>
                <div className="input-field">
                    <label>RateOfInterest</label>
                    <input type="number" step='0.01' name='rateOfInterest' onChange={handlechange} ></input>
                </div>
                <div className="input-field">
                    <label>Tenure</label>
                    <select name='tenure' onChange={handlechange}>
                        <option value="SELECT">SELECT</option>
                        <option value="8">8</option>
                        <option value="12">12</option>
                        <option value="18">18</option>
                        <option value="24">24</option>
                        <option value="48">48</option>
                    </select>
                </div>
               <button type='submit'>{buttonAction}</button>
            </form>
            <div className="background-img">
            </div>
        </div>
    </div>
    </>)
}