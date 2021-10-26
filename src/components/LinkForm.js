import React, { useState, useEffect } from 'react';
// import {toast} from 'react-toastify';
import { db } from '../firebase';

const LinkForm = (props) => {

    const initialStateValues = {
        invoice_number: '',
        total:'',
        currancy: '',
        invoice_date: '',
        due_date:'',
        vendor_name:'',
        remittance_address:'',
        status: false
    };

    
    const [values, setValues] = useState ( initialStateValues );

    const handleInputChange = (e) => {
        //establecer valores del estado inicial
        const { name, value } = e.target;
        //copiar aqui valores actuales ...values
        //luego vas a alterar el [name] con el valor que estoy capturando
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.addOrEditLink(values);
        setValues({...initialStateValues})
        console.log(values)
    };

    const getLinkById = async(id) => {
        const doc = await db.collection('links').doc(id).get();
        setValues({...doc.data()})
    }

    useEffect(() => {
        if (props.currentId === '') {
            setValues({initialStateValues});
        } else {
            getLinkById(props.currentId);
        }
    }, [props.currentId]);

    return  (
    <form onSubmit={handleSubmit} className="card card-body border-primary">
        <div className="form-group input-group">
        <div className="col-md-12 input-group-text bg-dark" > New Invoice </div>
            <div className="col-md-4 input-group-text bg-light" >
            {/* <i className="material-icons">create</i> */}
            Invoice number
            </div>
            <input
            type="text"
            value={values.invoice_number}
            name="invoice_number"
            placeholder="12345"
            className="form-control"
            onChange={handleInputChange}
            />
        </div>
        <div className="form-group input-group">
            <div className=" col-md-4 input-group-text bg-light">
            {/* <i className="material-icons">create</i>  */}
            Total
            </div>
            <input
            type="text"
            value={values.total}
            name="total"
            placeholder="199.99"
            className="form-control"
            onChange={handleInputChange}
            />
        </div>
        <div className="form-group input-group">
            <div className="col-md-4 input-group-text bg-light"> Currancy
            {/* <i className="material-icons">create</i> */}
            </div>
            <input
            type="text"
            value={values.currancy}
            name="currancy"
            placeholder="USD"
            className="form-control"
            onChange={handleInputChange}
            />
        </div>
        <div className="form-group input-group">
            <div className="col-md-4 input-group-text bg-light"> Invoice date
            {/* <i className="material-icons">create</i> */}
            </div>
            <input
            type="text"
            value={values.invoice_date}
            name="invoice_date"
            placeholder="2019-08-17"
            className="form-control"
            onChange={handleInputChange}
            />
        </div>
        <div className="form-group input-group">
            <div className="col-md-4 input-group-text bg-light"> Due date
            {/* <i className="material-icons">create</i> */}
            </div>
            <input
            type="text"
            value={values.due_date}
            name="due_date"
            placeholder="2019-08-17"
            className="form-control"
            onChange={handleInputChange}
            />
        </div>
        <div className="form-group input-group">
            <div className="col-md-4 input-group-text bg-light"> Vendor Name
            {/* <i className="material-icons">create</i> */}
            </div>
            <input
            type="text"
            value={values.vendor_name}
            name="vendor_name"
            placeholder="Acme Cleaners Inc."
            className="form-control"
            onChange={handleInputChange}
            />
        </div>
        <div className="form-group input-group">
            <div className="input-group-text bg-light"> Remittance Adress
            {/* <i className="material-icons">create</i> */}
            </div>
            <input
            type="text"
            value={values.remittance_address}
            name="remittance_address"
            placeholder="123 ABC St. Charlotte, NC 28209"
            className="form-control"
            onChange={handleInputChange}
            />
        </div>

        <button className="btn btn-primary btn-block">
            {props.currentId === "" ? "Save" : "Update"}
        </button>
    </form>      
    )
};

export default LinkForm;