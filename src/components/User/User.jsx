import { useState } from "react";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { auth } from "../../contexts/Firebase";
import { storage } from "../../contexts/Firebase";

import { useAuth } from "../../Hooks/useAuth";

import { useAuthState } from "react-firebase-hooks/auth";

import { FaUserCircle } from "react-icons/fa";

import "./User.css"

export function User() {

    const [ imgURL, setImgURL] = useState("");
    const [progress, setProgress] = useState(0);

    const [user] = useAuthState(auth);
    

    const { logOut } = useAuth();

    const realizaLogOut = () => {
        logOut();
        document.querySelector(".form__login").classList.remove("login__ativado");
    }

    const handleUpload = (e) => {
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
                })
            }
        )
    }

    const DefineFotoUsuário = () => {
        return !imgURL
        ?
        <FaUserCircle className="icones__nav"/>
        :
        <img src={imgURL} alt="Foto de perfil" className="foto__perfil"/>
    }


    return (
        <article className="corpo">
            <DefineFotoUsuário />
            <form onSubmit={handleUpload}>
                <input 
                    type="file"
                />
                <button
                    type="submit"
                >
                    Enviar
                </button>
            </form>
            {!imgURL && <progress value={progress} max="100" />}
            <p>
                Usuário: {user.email}
            </p>
            <button
                type="button"
                className="button__register"
                onClick={realizaLogOut}
            >
                Sair
            </button>
        </article>
    );
}