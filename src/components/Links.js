import { db } from "../firebase";
import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import LinkForm from './LinkForm';

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getLinks = async () => {
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  const onDeleteLink = async (id) => {
    if (window.confirm("are you sure you want to delete this invoice?")) {
      await db.collection("links").doc(id).delete();
      toast("Invoice Removed Successfully", {
        type: "error",
        autoClose: 2000
      });
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  const addOrEditLink = async (linkObject) => {
    try {
      if (currentId === "") {
        await db.collection("links").doc().set(linkObject);
        toast("Invoice submitted successfully", {
          type: "success",
        });
      } else {
        await db.collection("links").doc(currentId).update(linkObject);
        toast("Invoice Updated Successfully", {
          type: "info",
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="col-md-5 p-2">
        <LinkForm {...{ addOrEditLink, currentId, links }} />
      </div>
      <div className="col-md-7 p-2">
          <div className="card mb-1" >
            <div className="card-body">
            {links.map((link) => (
                <div key={link.id}>
                <table>
                    <tr>
                        <td className="col-md-2 bg-dark">Invoice number</td>
                        <td className="col-md-2">Total</td>
                        <td className="col-md-2">Currancy</td>
                        <td className="col-md-2">Invoice Date</td>
                        <td className="col-md-2">Due Date</td>
                        <td className="col-md-2">Remittance Adress</td>
                        <td className="col-md-2">Status</td>
                        <td className="col-md-2">actions</td>
                    </tr>
                    <tr>
                            <td className="col-md-2"><h4>{link.invoice_number}</h4></td>
                            <td className="col-md-2"><p>{link.total}</p></td>
                            <td className="col-md-2"><p>{link.currancy}</p></td>
                            <td className="col-md-2"><p>{link.invoice_date}</p></td>
                            <td className="col-md-2"><p>{link.due_date}</p></td>
                            <td className="col-md-2"><p>{link.remittance_address}</p></td>
                            <td className="col-md-2"><p>{link.status? false : 'Pending'}</p></td>
                            <td className="col-md-2">
                                <div>
                                    <i
                                        className="material-icons text-danger"
                                        onClick={() => onDeleteLink(link.id)}
                                    >
                                        close
                                    </i>
                                    <i
                                        className="material-icons"
                                        onClick={() => setCurrentId(link.id)}
                                    >
                                        create
                                    </i>
                                </div>
                            </td>
                    
                    </tr>
                </table>
                </div>
                ))}
            </div>
        </div>
      </div>
    </>
  );
};

export default Links;