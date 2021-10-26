import React, { useState, useEffect } from 'react';
import {toast} from 'react-toastify';
import { db } from '../firebase';

const LinkForm = (props) => {

    const initialStateValues = {
        urb: '',
        name: '',
        description: ''
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
    }

    useEffect(() => {
        if (props.currentId === '') {
            setValues({initialStateValues});
        } else {
            console.log("editing")
        }
    }, [props.currentId]);

    return  (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i class="material-icons">insert_link</i>
                </div>                
                <input 
                    type='text' 
                    className="form-control" 
                    placeholder="invoice" 
                    name="invoice"
                    onChange={ handleInputChange }
                />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i class="material-icons">create</i>
                </div>
                <input type="text" className="form-control" name="web" placeholder="Website" onChange={ handleInputChange }/>
            </div>
            <div className="form-group">
                <textarea name="description" rows="3" className="form-control" placeholder="Write a description" onChange={ handleInputChange }></textarea>
            </div>
            <button className="btn btn-primary btn-block">
                Save
            </button>
        </form>      
    )
};

export default LinkForm;