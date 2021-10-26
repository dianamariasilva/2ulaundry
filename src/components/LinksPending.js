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
      <div className="col-md-4 p-2">
        <LinkForm {...{ links }} />
      </div>
      <div className="col-md-8 p-2">
        {links.map((link) => (
          <div className="card mb-1" key={link.id}>
            <table>
                <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h4>{link.name}</h4>
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
                    </div>
                    <p>{link.invoice_number}</p>
                    <p>{link.currancy}</p>
                    <p>{link.description}</p>
                    <p>Estado: {link.status? 'Approved' : 'Pending'}</p>
                    <button className={link.status? 'btn btn-sucess' : 'btn btn-danger'} onClick={() => onChangeStatusLink(link.id)}>
                      {link.status? 'Approved' : 'Pending'}
                    </button>

                </div>
            </table>
          </div>
        ))}
      </div>
    </>
  );
};

export default LinksPending;