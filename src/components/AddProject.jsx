import { useRef } from "react"
import Input from "./Input"
import Modal from "./Modal.jsx";


export default function AddProject({onAdd, onCancel}){
    const modal = useRef();
    {/*ref is used to connect to HTML elements*/}
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function handleSave(){
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDuedate = dueDate.current.value;

        if(enteredTitle.trim() === ''||
         enteredDescription.trim() === ''||
          enteredDuedate.trim() === ''
        ){
            {/*show the error model*/}
            modal.current.open();
            return;
        }

        {/*validation*/}
     onAdd({
        title: enteredTitle,
        description: enteredDescription,
        dueDate: enteredDuedate,
     });
    }

    
    return(
    <>
    <Modal  ref={modal} buttonCaption = "Close">
        <h2 className="text-xl font-bold text-stone-700 my-4 ">Invalid Input</h2>
        <p className="text-stone-600 mb-4">Oops ... look like you forgot to enter a value.</p>
        <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field.</p>
    </Modal>
    <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
               <li><button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>Cancel</button></li>
               <li><button className="px-6 py-4 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                onClick={handleSave}  > 
                Save</button></li>
            </menu>
            <div>
                <Input type = "text" ref = {title} label="Title" />
                <Input ref = {description} label="Description" textarea />
                <Input type = "date" ref = {dueDate} label="Due Date" />
            </div>
        </div>
        </>
    
    )}