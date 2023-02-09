import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth } from "../../contexts/Firebase";
import { storage } from "../../contexts/Firebase";
import { getAuth, updateProfile } from "firebase/auth";
import { useAuth } from "../../Hooks/useAuth";
import { useAuthState } from "react-firebase-hooks/auth";

import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

export function Profile() {
    const [ imgURL, setImgURL] = useState();
    const [progress, setProgress] = useState(0);
    const [user] = useAuthState(auth);

    const progressBar = document.querySelector(".progress")
    
    const params = getAuth();
    const { logOut } = useAuth();

    const realizaLogOut = () => {
        logOut();
    }

    const handleUpload = (e) => {
        progressBar.classList.remove("d-none")
        e.preventDefault();

        const file = e.target[0]?.files[0]
        if(!file) return

        const storageRef =ref(storage, `images/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
                setProgress(progress);
            },
            error => {
                alert(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    setImgURL(url)
                    updateProfile(params.currentUser, {
                        photoURL: url
                    }).then(() => {
                        window.location.reload(true);
                    }, (error) => {
                        toast.error("Error! Photo not updated!")
                    })
                })
            }
        )
    }

    const DefineFotoUsuário = () => {
        return user.photoURL===null
        ?
        <FaUserCircle className="rounded-circle m-2" style={{width:"100px", height:"100px"}} />
        :
        <img src={user.photoURL} alt="Foto de perfil" className="rounded-circle m-2" width="100px" height="100px"/>
    }

    const updateUserName = () => {
        
        let nameUpdated = document.getElementById("nome");

        updateProfile(params.currentUser, {
            displayName: nameUpdated.value
          }).then(() => {
                toast.success("Name updated")
          }).catch((error) => {
                console.log(error);
          });
    }

    return (
        <section >
            <h2>Profile</h2>
            <form className="row g-3">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="nome" className="form-label">Name</label>
                        <input type="text" name="nome" id="nome" className="form-control" defaultValue={user.displayName} required/>
                    </div>
                    <div className="col-auto">
                        <button type="button" onClick={updateUserName} className="btn btn-outline-primary mb-3">Save</button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input type="email" name="email" id="email" className="form-control" disabled value={user.email}/>
                    </div>
                </div>
            </form>
            <h2>Profile picture</h2>
            <DefineFotoUsuário />
            <form onSubmit={handleUpload}>
                <div className="progress mb-2 d-none">
                    {!imgURL && <div class="progress-bar bg-success" role="progressbar" style={{width: (progress*20)}}></div>}
                </div>
                <div className="input-group mb-3">
                    <input className="form-control" type="file" name="enviarFoto" id="enviarFoto" />
                    <button className="btn btn-outline-primary" type="submit">Send</button>
                </div>
            </form>
            <button type="button" onClick={realizaLogOut} className="btn btn-primary">Sign Out</button>
        </section>
    );
};