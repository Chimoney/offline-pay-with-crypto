import * as React from 'react';
import { useContext, createContext, useState } from 'react';


const ModalContext = createContext({ setIsOpen: () => { }, toggleModal: () => {}, isOpen: false, setModalConfig: () => { }, modalConfig: null });

 const useModal = () => {
    return useContext(ModalContext);
}

 function ModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({});

    const toggleModal  = () => {
        setIsOpen(!isOpen)
    }

    return (
        <ModalContext.Provider value={{
            isOpen,
            setIsOpen,
            toggleModal,
            setModalConfig,
            modalConfig
        }}>
            {children}

        </ModalContext.Provider>
    )
}

export {
    useModal,
    ModalProvider
}
// export default ModalProvider;