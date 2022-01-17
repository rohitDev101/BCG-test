import axios from 'axios';
import React, { useState } from 'react';

import './PolicyData.css';

const dataFields = ['Policy Id',
    'Date of Purchase',
    'Customer Id',
    'Fuel',
    'VEHICLE SEGMENT',
    'Premium',
    'Bodily injury liability',
    'Personal injury protection',
    'Property damage liability',
    'Collision',
    'Comprehensive',
    'Gender',
    'Income group',
    'Region',
    'Marital status',]

const ACTION_TYPES = {
    SET_FORM_VALUE: 'SET_FORM_VALUE',
    }
export const baseUrl = 'http://localhost:3010/';

const readOnlyFields = ['Policy_id','Customer_id', 'Date of Purchase']
function PolicyData() {
    const [data, setData] = useState([]);
    const [dataSelected, setDataSelected] = useState({});
    const [searchval, setSearchval] = useState(0);
    const [formError, setFormerror] = useState({});

    const initialState = {
        formData: {}
    }

    const reducer = (state, action) => {
        switch(action.type){
            case ACTION_TYPES.SET_FORM_VALUE:
                return {
                    ...state,
                    formData: action.formData
                }
            default:
                return state;
        }
    }
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const {formData} = state;

    const handleValidation = (newVal, key) => {
        let errorObj = {...formError}
        if (key === 'Premium' && newVal > 1000000) {
            setFormerror({ [key]: "Premium should be less than 1,000,000", ...errorObj });
        } else if (formError[key]){
            delete errorObj[key]
            setFormerror(errorObj);     
        }
        formData[key] = newVal;
        dispatch({
            type: ACTION_TYPES.SET_FORM_VALUE,
            formData
        })
    }

    const handleChange = (e) => {
        setSearchval(parseInt(e.target.value));
    }

    const getSearchData = async () => {
        if (!searchval) return
        try{
        let res = await axios.get(`http://localhost:3010/data/${searchval}`)
        setData(res.data);
        } catch(error){
            console.log(error);
            alert('Error')
        }
    }
    const handleDataSelection = (d) => {
        dispatch({
            type: ACTION_TYPES.SET_FORM_VALUE,
            formData: d
        });
        setDataSelected(d);
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
        await axios.post(baseUrl+'updatepolicy', state.formData);
        setDataSelected({});
        setData([]);
        alert('Policy successfully updated!!!')
        } catch(error) {
            console.log(error)
            alert('Error')
        }
    }
    let errorClass = Object.keys(formError).length>0 ? 'diabledField': '';
    return (
        <>
            <div className='head my-3 h5'> Search by Policy number or Customer Id </div>
            <div className="input-group mb-3 justify-content-center">
                <div className="col-3">
                    <input type="search" onChange={handleChange} id="form1" placeholder="Enter Policy id or customer id" className="form-control" />
                    {/* <label className="form-label" htmlFor="form1">Search</label> */}
                </div>
                <button type="button" onClick={getSearchData} className="btn btn-primary">
                    <i className="fas fa-search"></i>
                </button>
            </div>
            {data.length > 0 && !(Object.keys(dataSelected).length > 0) && <div>
                <table className='table table-hover table-striped table-bordered '>
                    <thead>
                        <tr>
                            {dataFields.map((head, i) => (
                                    <th  key={i}>{head}</th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 && data.map(d => (
                            <tr key={d.Policy_id} onClick={() => handleDataSelection(d)}>
                                {Object.keys(d).map(head => (
                                    <td className='td' key={head} >{d[head]}</td>
                                ))}
                            </tr>)
                        )}
                    </tbody>
                </table>
            </div>}
            <div className='row'>
                {Object.keys(dataSelected).length > 0  && 
                <form onSubmit={handleSubmit} className=' col-5 mx-auto  my-3 shadow bg-body rounded'>
                    <div className='mx-auto'><p className="h3 text-secondary my-4">Edit Details</p></div>
                    {Object.keys(dataSelected).map((el, i)=>(<div className="mx-auto my-4" key={el}>
                        <label htmlFor={el} className="form-label">{dataFields[i]} :</label>
                        <input type="input" readOnly={readOnlyFields.includes(el)} id={el} value={formData[el]} onChange={(e)=>handleValidation(e.target.value, el)} className="form-control " />
                        {formError[el] && <p className='text-danger'>{formError[el]}</p>}
                    </div>))}
                    <div className='mx-auto my-5' >
                    <button type="submit" disabled={errorClass} className={"btn btn-primary "+errorClass}>Submit</button>
                    <button type="button" className="btn btn-secondary float-end" onClick={()=>{setDataSelected({}); setData([])}}>Cancel</button>
                    </div>
                </form>}
            </div>
        </>
    )
}

export default PolicyData;