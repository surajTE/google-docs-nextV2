import dynamic from "next/dynamic"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { useRouter } from "next/router";
import { db } from "../firebase"
import { useEffect, useState } from "react";
import { convertFromRaw, convertToRaw } from "draft-js";
import { useSession } from "next-auth/react";
import { collection, doc, getDocs, onSnapshot, query, queryEqual, addDoc, set, setDoc } from "firebase/firestore";

const Editor = dynamic(() => import("react-draft-wysiwyg").then(module => module.Editor), {
    ssr: false,
})

function TextEditor() {
    const { data: session } = useSession();
     const [editorData,setEditorData] =useState([])
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const router = useRouter();
    const { id } = router.query;
    
   

    // console.log(editorState)
    
    // const docRef = doc(db, "userDocs", session.user.email, "docs", id)
 
 
    // onSnapshot(docRef, (doc) => { setEditorData(doc.data())})
   
    useEffect(() => {
        
        const docRef = doc(db, "userDocs", session.user.email, "docs", id)
        onSnapshot(doc(docRef), (doc) => {
            setEditorData(doc.data())}) 
          
            if(editorData?.Editor){
                setEditorState(EditorState.createWithContent(
                    convertFromRaw(editorData.Editor)
                ))
             }
         
   }, []);
   const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const docRef = doc(db, "userDocs", session.user.email, "docs", id)
    addDoc((docRef) ,{ 
        Editor: convertToRaw(editorState.getCurrentContent()) 
    }, { 
        merge: true 
    });
    
};
    return (
        <Editor
            initialEditorState={editorState}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class mt-6 bg-white shadow-lg max-w-5xl mx-auto mb-12 border p-10"
            toolbarClassName="toolbar-class !justify-center mx-auto"
        />
    );
}

export default TextEditor