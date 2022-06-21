import Image from 'next/image'

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, IconButton, Modal } from "@mui/material";

import { Box } from "@mui/material";
import { useState } from "react";
import { db } from "../firebase";
import { getDoc, getFirestore, query } from "firebase/firestore";
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { useEffect } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  boxShadow: 24,
  p: 3,
};

function CreateNewDoc({ session }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const createDoc = () => {
    if (!input) return;
    addDoc(collection(db, "userDocs", session.user.email, "docs"), {
      filename: input,
      timestamp: serverTimestamp(),
    });
    setInput(input);
    setOpen(false);
  };

  return (
    <section style={{background:"#f1f3f4"}} className='px-10 pb-10'>
      <div className='max-w-3xl mx-auto'>
          <div style={{ padding: "10px 0" }} className='flex items-center justify-between'>
            <h2 style={{color:"#202124"}} className='text-lg'>Start a new document</h2>
            <IconButton sx={{ p: '15px' }} aria-label="more">
              <MoreVertIcon style={{ color: "#5f6368",}}/>
            </IconButton>
          </div>
          <div>
            <div style={{ width:"118px", height:"150px" }} className='relative border-1 cursor-pointer add_doc' >
              <Image src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" 
                layout="fill" 
                onClick={() => setOpen(true)}
                />
            </div>
            <p style={{color:"#202124"}} className='ml-2 mt-2 font-semibold text-sm'>Blank</p>
          </div>
        </div>

        <Modal 
          open={open} 
        >
          <Box sx={style} className="rounded-xl">
            <input value={input} 
              type="text" 
              placeholder="Enter your name of Document...." 
              className='outline-none w-full doc_name' 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createDoc()}
            />
			        <Button className="mt-5 font-semibold text-m modal-cancel" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="mt-5 font-semibold text-m ml-4 modal-create" onClick={createDoc}>Create</Button>
          </Box>
        </Modal>
    </section>
  );
}

export default CreateNewDoc;
