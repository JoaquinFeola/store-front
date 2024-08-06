import { FormEvent, ReactNode, useReducer } from "react"
import { ModalsContext } from "../ModalsContext"
import { modalsReducer } from "../../reducers/modals.reducer"
import { IModal, IModalCreate } from "../../interfaces";
import { MODAL_TYPES } from "../../consts/modals-consts";
import { createPortal } from "react-dom";
import { Modal } from "../../ui/components";


export const ModalsProvider = ({ children }: { children: ReactNode }) => {

  const [modals, modalsDispatch] = useReducer(modalsReducer, []);





  const newModal = ({ content, submitFunc, confirmLabel, title }: IModalCreate) => {
    const modalId = new Date().getTime();
    modalsDispatch({
      type: MODAL_TYPES.CREATE,
      payload: {
        id: modalId,
        content: content,
        submitFunc: (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          submitFunc(e);
          modalsDispatch({ type: MODAL_TYPES.DELETE, payload: {} as IModal })
        },
        confirmLabel: confirmLabel,
        title: title,
        cancelFunc: () => modalsDispatch({ type: MODAL_TYPES.DELETE, payload: {} as IModal })
      }
    })


  };

  return (
    <ModalsContext.Provider
      value={{
        newModal
      }}
    >
      {
        createPortal(
          <>
            {modals.map((modal) => <Modal key={modal.id} {...modal} />)}
          </>,
          document.body
        )
      }

      {children}
    </ModalsContext.Provider>
  )
}
