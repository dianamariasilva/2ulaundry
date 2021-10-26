import { db } from "../firebase";
import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import LinkForm from './LinkForm';
import { collection, onSnapshot } from "firebase/firestore";

const LinksPending = () => {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getLinks = async () => {
    db.collection("links").where('status','==', false).onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
    const unsubscribe = onSnapshot(db.collection("links"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            console.log("Agregado", change.doc.data());
        }
        if (change.type === "modified") {
            console.log("Editado", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Eliminado", change.doc.data());
        }
      });
    });
    // unsubscribe();
  };

  const onDeleteLink = async (id) => {
    if (window.confirm("are you sure you want to delete this invoice?")) {
      await db.collection("links").doc(id).delete();
      toast("Link Removed Successfully", {
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
        toast("New Invoice Added", {
          type: "success",
        });
      } else {
        await db.collection("links").doc(currentId).update(linkObject);
        toast("Link Updated Successfully", {
          type: "info",
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeStatusLink = async (linkId) => {
    try {
        await db.collection("links").doc(linkId).update({
          status: true
        });
        toast("Approved", {
          type: "success",
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="col-md-12 p-2">
          <div className="card mb-1" >
            <table>
                    <tr>
                        <td className="col-md-2 bg-dark">Invoice number</td>
                        <td className="col-md-2 bg-dark">Total</td>
                        <td className="col-md-2 bg-dark">Currancy</td>
                        <td className="col-md-2 bg-dark">Invoice Date</td>
                        <td className="col-md-2 bg-dark">Due Date</td>
                        <td className="col-md-2 bg-dark">Remittance Adress</td>
                        <td className="col-md-2 bg-dark">Status</td>
                        <td className="col-md-2 bg-dark">actions</td>
                    </tr>
                    {links.map((link) => (
                    <tr key={link.id}>
                            <td className="col-md-2"><h4>{link.invoice_number}</h4></td>
                            <td className="col-md-2"><p>{link.total}</p></td>
                            <td className="col-md-2"><p>{link.currancy}</p></td>
                            <td className="col-md-2"><p>{link.invoice_date}</p></td>
                            <td className="col-md-2"><p>{link.due_date}</p></td>
                            <td className="col-md-2"><p>{link.remittance_address}</p></td>
                            <button className={link.status? 'btn btn-sucess' : 'btn btn-danger'} onClick={() => onChangeStatusLink(link.id)}>
                              {link.status? 'Approved' : 'Pending'}
                            </button>
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
                    ))}
                </table>
                </div>
          </div>
    </>
  );
};

export default LinksPending;