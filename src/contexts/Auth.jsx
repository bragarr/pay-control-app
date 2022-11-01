import { createContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const novoUsuario = (auth, email, password) => {     
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
            const user = userCredential.user;
            return res.status(200).json("Usuário Cadastrado com sucesso!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return res.json(error);
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
            value={{ novoUsuario, login, logOut }}
        >
            { children }
        </AuthContext.Provider>
    )

}