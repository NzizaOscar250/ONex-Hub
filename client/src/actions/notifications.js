import {toast} from "react-toastify"




    export const Error = (message)=> {
         if(!message) return null
         
        return toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            closeOnClick: true,
            toastId:"oscar250",
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }


    export const fireNotify =(info)=> toast.info(info,{theme:'colored',toastId:'oscar250'})
    export const Update = (id,message,type)=> toast.update(id, { render: message, type});
        