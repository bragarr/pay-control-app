import { createContext, useEffect, useState } from "react";
import { auth } from "../contexts/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        })
    }, []);    

    const novoUsuario = (auth, email, password) => {

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in
            const user = userCredential.user;
            toast.success("Usuário Cadastrado com sucesso!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error("Usuário Cadastrado com erro para cadastrar!");
        });
    };

    const login = (auth, email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    };

    const logOut = () => {
        signOut(auth).then(() => {
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    }

    return (
        <AuthContext.Provider
            value={{user, logado: !!user, novoUsuario, login, logOut}}
        >
            { children }
        </AuthContext.Provider>
    )
}