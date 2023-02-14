import { Button, Input } from '@chakra-ui/react';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { useState } from 'react';
import { db } from '..';
import { query, where } from 'firebase/firestore';
const Addagenda = ({ date, addData, setText, text, deleteData, textInput }) => {
  // const [text, setText] = useState(undefined);
  //
  // const addData = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, 'users'), {
  //       first: text,
  //       last: 'Lovelace',
  //       born: 1815,
  //       date: date,
  //     });
  //
  //       'Document written with IDD: ',
  //       docRef.id,
  //       date.toISOString().split('T')[0]
  //     );
  //   } catch (e) {
  //     console.error('Error adding document: ', e);
  //   }
  // };

  const styles = {
    marginTop: '2vw',
  };
  return (
    <div style={styles}>
      <Input
        ref={textInput}
        placeholder="Type your task"
        value={text}
        onChange={e => {
          setText(e.target.value);
        }}
        onKeyDown={e => {
          if (e.key == 'Enter') {
            if (text != '') addData();
          }
        }}
      />
      <br />
      <br />
      <Button
        onClick={() => {
          if (text != '') addData();
        }}
        colorScheme="purple"
      >
        Add
      </Button>
      <br />
      <br />
      <Button
        onClick={() => {
          deleteData();
        }}
        colorScheme="red"
      >
        Delete Entire Calendar
      </Button>
    </div>
  );
};
export default Addagenda;
