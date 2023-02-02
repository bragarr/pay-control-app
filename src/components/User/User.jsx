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

export function User() {

    const [ imgURL, setImgURL] = useState("");
    const [progress, setProgress] = useState(0);

    const [user] = useAuthState(auth);

    // Define a exibição do nome do usuário quando o mesmo já estiver cadastrado
    const NomeUsuario = () => {
        return user.displayName===null
        ?
        ""
        :
        <p>Nome: {user.displayName}</p>
    }
    
    const { logOut } = useAuth();

    // Define a saída efetiva do usuário da aplicação
    const realizaLogOut = () => {
        logOut();
        document.querySelector(".form__login").classList.remove("login__ativado");
    }

    // Realiza o upload e atualização de foto de perfil do usuário
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

    // Defini na área de pérfil se é exibido ícone genêrico ou foto selecionada pelo usuário
    const DefineFotoUsuário = () => {
        return user.photoURL===null
        ?
        <FaUserCircle />
        :
        <img src={user.photoURL} alt="Foto de perfil"/>
    }

    // Oculta campos de login quando o usuário estiver com signin ativo

    //Exibe campos para edição de fotos
    const editarFotoPerfil = () => {
        document.querySelector(".campo__foto").classList.toggle("edicao__desativada");
    }

    //Exibe campos para exibição de perfil
    const editarPerfil = () => {
        document.querySelector(".form__nome").classList.toggle("edicao__desativada");
    }

    // Alterna o status de texto do botão para atualizar foto de perfil
    const statusFoto = () => {
        let botao = document.querySelector(".button__foto");
        if(botao.textContent === "Enviar") {
            botao.textContent = "Confirmar"
        } else {
            botao.textContent = "Enviar";
        }
    }

    return (
        <article>
            <DefineFotoUsuário />
            <NomeUsuario />
            <p>
                Email: {user.email}
            </p>
            <div onClick={editarFotoPerfil}>
                <BsPencilSquare />
                <p>Editar foto</p>
            </div>
            <form onSubmit={handleUpload}>
                {!imgURL && <progress value={progress} max="100"/>}
                <label htmlFor="enviarFoto">
                    <BsFileEarmarkArrowDown /> Escolher arquivo
                </label>
                <input 
                    type="file"
                    name="enviarFoto"
                    id="enviarFoto"
                />
                <button
                    type="submit"
                    onClick={statusFoto}
                >
                    Enviar
                </button>
            </form>
            <div onClick={editarPerfil}>
                <BsPencilSquare />
                <p>Editar nome</p>
            </div>
            <EditUser />
            <button
                type="button"
                onClick={realizaLogOut}
            >
                Sair
            </button>
        </article>
    );
}