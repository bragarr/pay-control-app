import { useState } from "react";

import { EditUser } from "../EditUser/EditUser";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth } from "../../contexts/Firebase";
import { storage } from "../../contexts/Firebase";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../../Hooks/useAuth";
import { useAuthState } from "react-firebase-hooks/auth";

import { FaUserCircle } from "react-icons/fa";
import { BsPencilSquare, BsFileEarmarkArrowDown } from "react-icons/bs";

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

        updateProfile(user, {
            photoURL: imgURL
        }).then(() => {
            let photoURL = user.photoURL;
            console.log(photoURL);
        }, (error) => {
            console.log(error);
        })
    }

    const DefineFotoUsuário = () => {
        return !imgURL
        ?
        <img src={user.photoURL} alt="Foto de perfil" className="foto__perfil"/>
        :
        <FaUserCircle className="icones__nav"/>
    }

    const OcultaLogin = () => {
        return !user
        ?
        "Login Desativado - Usuário Signed in"
        :
        document.querySelector(".form__login").classList.add("login__ativado")
    }

    const editarFotoPerfil = () => {
        document.querySelector(".campo__foto").classList.toggle("edicao__desativada");
    }

    const editarPerfil = () => {
        document.querySelector(".form__nome").classList.toggle("edicao__desativada");
    }

    return (
        <article className="corpo">
            <OcultaLogin />
            <DefineFotoUsuário />
            <div className="edicao__foto" onClick={editarFotoPerfil}>
                <BsPencilSquare />
                <p className="texto__foto">Editar foto</p>
            </div>
            <form onSubmit={handleUpload} className="campo__foto edicao__desativada">
                {!imgURL && <progress value={progress} max="100" className="barra__progresso"/>}
                <label htmlFor="enviarFoto" className="selecionar__foto">
                    <BsFileEarmarkArrowDown /> Escolher arquivo
                </label>
                <input 
                    type="file"
                    name="enviarFoto"
                    id="enviarFoto"
                />
                <button
                    type="submit"
                    className="button__foto"
                >
                    Enviar
                </button>
            </form>
            <div className="edicao__perfil" onClick={editarPerfil}>
                <BsPencilSquare />
                <p className="texto__edicao">Editar Perfil</p>
            </div>
            <EditUser />
            <p>
                Email: {user.email}
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