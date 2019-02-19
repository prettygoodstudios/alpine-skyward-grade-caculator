import React from "react";

const Modal = ({title, children, dismiss, submit, visible}) => {
    if(!visible){
        return <div></div>;
    }
    return(
        <div className="modal">
            <div className="modal__header">
                <div className="modal__header__title">{title}</div>
                <a onClick={dismiss} className="modal__header__dismiss">X</a>
            </div>
            <div className="modal__body">{children}</div>
            <div className="modal__footer">
                <a onClick={submit} className="modal__footer__submit">Submit</a>
            </div>
        </div>
    );
}

export default Modal;