import React, { useState, useEffect } from 'react';
// import {toast} from 'react-toastify';
import { db } from '../firebase';

const LinkForm = (props) => {

    const initialStateValues = {
        invoice_number: '',
        currancy: '',
        description: '',
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
            <div className="input-group-text bg-light">
            <i className="material-icons">create</i>
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
            <div className="input-group-text bg-light">
            <i className="material-icons">create</i>
            </div>
            <input
            type="text"
            value={values.currancy}
            name="currancy"
            placeholder="Website Name"
            className="form-control"
            onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <textarea
            rows="3"
            className="form-control"
            placeholder="Write a Description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            ></textarea>
        </div>
        

        <button className="btn btn-primary btn-block">
            {props.currentId === "" ? "Save" : "Update"}
        </button>
    </form>      
    )
};

export default LinkForm;