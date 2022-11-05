import { createContext, useEffect, useState } from "react";
import { auth } from "../contexts/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
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
            const resolveThreeSecs = new Promise((resolve,reject) => {
                setTimeout(resolve, 3000);
            });
            toast.promise(resolveThreeSecs, {
                pending: "Cadastro em andamento...",
                success: "Cadastro realizado com sucesso!",
                error: "Erro! E-mail já cadastrado!"
            })
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const resolveThreeSecs = new Promise((resolve,reject) => {
                setTimeout(reject, 3000);
            });
            toast.promise(resolveThreeSecs, {
                pending: "Cadastro em andamento...",
                success: "Cadastro realizado com sucesso!",
                error: "Erro! E-mail já cadastrado!"
            })
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
            if(errorCode==="auth/wrong-password") {
                toast.error("Senha Incorreta!")
            } else {
                toast.error("Usuário Não Cadastrado!")
            }        
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