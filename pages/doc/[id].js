import TextEditor from "../../components/TextEditor";
import Login from '../../components/Login';

import DescriptionIcon from '@mui/icons-material/Description';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Avatar from '@mui/material/Avatar';

import { db } from "../../firebase";

import { getSession, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, onSnapshot, query, queryEqual, addDoc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/router';

const Doc = () => {
  
  const { data: session } = useSession();

  const [fileName, setFileName] = useState([]);

  if (!session) return <Login />

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "userDocs", session.user.email, "docs", id)
      onSnapshot(docRef, (doc) => {
        const data = (doc.data())
        setFileName(data);
      })
    };
    getData();
  }, []);

  return (
    <div>
      <header className='flex justify-between item-center p-3 pb-1 shadow-sm'>
        <span onClick={() => router.push("/")} className='cursor-pointer'>
          <IconButton sx={{ p: '7px' }}>
            <DescriptionIcon style={{ fontSize: "45px", color: "#4285f4" }} />
          </IconButton>
        </span>
        <div className='flex-grow px-2'>
          <h1>
            {fileName.filename}
          </h1>
          <div className="flex items-center text-sm -ml-1 h-8 text-gray-600 space-x-1">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>

        <Button
          style={{
            background: "#1f84f8",
            color: "white",
          }}
          className="md:inline-flex share mr-3">
          <Icon size="md" className='mr-2'>people</Icon>Share
        </Button>

        {/* <Avatar src={session.user.image} alt="" /> */}
      </header>

      <section style={{ background: "#f1f3f4" }} className="min-h-screen pb-16">
       <TextEditor/>
      </section>

      {/* <section>
        <TextEditor />
      </section> */}

    </div>
  )
}

export default Doc

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}