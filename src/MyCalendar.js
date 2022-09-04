import { Box, Button } from '@chakra-ui/react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect } from 'react';
import MyCal from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from '.';
import Addagenda from './calendardata/Addagenda';
import Viewagenda from './calendardata/Viewagenda';
import { query, where } from 'firebase/firestore';
import { useRef } from 'react';
import { getAuth } from 'firebase/auth';

export function MyCalendar({ user }) {
  const auth = getAuth();
  console.log(auth.currentUser.uid, 'THE AUTH INSIDE');
  let now = new Date();
  now.setHours(0, 0, 0, 0);
  const [date, setDate] = useState(now);
  const [tasks, setTasks] = useState();
  const [text, setText] = useState(undefined);
  const [update, setUpdate] = useState();
  const [getAll, setGetAll] = useState(false);
  const textInput = useRef(null);

  console.log(date);
  const changeDate = date => {
    setGetAll(false);
    setDate(date);
  };

  const handler = e => {
    if (e.keyCode === 191) {
      console.log('pressed /');

      textInput.current.focus();
    }
  };
  useEffect(() => {
    window.addEventListener('keyup', handler, false);

    const renderTasks = async () => {
      console.log(user.uid, 'userUID boi');
      if (getAll === true) {
        const usersRef = collection(db, user.uid);
        const querySnapshot = await getDocs(
          usersRef,
          where('user', '==', user.uid)
        );
        const agendas = [];
        querySnapshot.forEach(doc => {
          let obj = doc.data();
          console.log(obj);
          obj.id = doc.id;
          agendas.push(obj);
          // agendas.push(doc.data(), doc.id);
          //   console.log(doc.data());
          //   console.log(
          //     `${doc.id} => ${doc.data().date.toDate().toISOString().split('T')[0]}`
          //   );
        });
        console.log(agendas);
        agendas.sort((a, b) => {
          return a.time > b.time ? 1 : b.time > a.time ? -1 : 0;
        });
        console.log(agendas);
        setTasks(agendas);
      } else {
        // Create a reference to the cities collection
        const usersRef = collection(db, user.uid);

        // Create a query against the collection.
        const q = query(
          usersRef,
          where('date', '==', date),
          where('user', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const agendas = [];

        querySnapshot.forEach(doc => {
          let obj = doc.data();
          obj.id = doc.id;
          agendas.push(obj);
          // agendas.push(doc.data(), doc.id);
          //   console.log(doc.data());
          //   console.log(
          //     `${doc.id} => ${doc.data().date.toDate().toISOString().split('T')[0]}`
          //   );
        });
        // agendas.sort();
        agendas.sort((a, b) => {
          return a.time > b.time ? 1 : b.time > a.time ? -1 : 0;
        });
        setTasks(agendas);
      }
    };
    renderTasks();
    return () => window.removeEventListener('keydown', handler, false);
  }, [text, update, date, getAll]);

  const addData = async () => {
    try {
      const docRef = await addDoc(collection(db, user.uid), {
        first: text ? text : 'Nothing added',
        last: 'Lovelace',
        born: 1815,
        date: date,
        time: date.toISOString().split('T')[0] + 'T00:00',
        user: auth.currentUser.uid,

        // 2022-09-04T00:00
      });
      console.log(
        'Document written with IDD: ',
        docRef.id,
        date.toISOString().split('T')[0]
      );
      console.log(JSON.stringify(date), 'date here');
      setText('');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const deleteData = async () => {
    // Create a reference to the cities collection
    const usersRef = collection(db, user.uid);

    // Create a query against the collection.
    // const q = query(usersRef, where('first', '==', 'Ada'));
    const stuff = await getDocs(collection(db, user.uid));
    stuff.forEach(docc => {
      console.log(docc.data());
      deleteDoc(doc(db, user.uid, docc.id));
    });
    // setText(text);
    setUpdate(Math.random());
  };
  console.log(date.toDateString(), 'date');
  console.log(now.toDateString(), 'now');
  console.log(date.toDateString() == now.toDateString());

  return (
    <div className="calendar">
      <Box sx={{ flexBasis: '40%' }}>
        <MyCal onChange={changeDate} value={date} />
        <br />
        <Button
          colorScheme="green"
          variant={getAll == true ? 'solid' : 'outline'}
          onClick={() => {
            setGetAll(true);
          }}
        >
          View all
        </Button>
        <br />
        <br />
        <Button
          colorScheme={
            date.toDateString() == now.toDateString() && getAll == false
              ? 'green'
              : 'green'
          }
          variant={
            date.toDateString() == now.toDateString() && getAll == false
              ? 'solid'
              : 'outline'
          }
          onClick={() => {
            setDate(now);
            setGetAll(false);
          }}
        >
          Today
        </Button>
      </Box>
      <Box sx={{ flexBasis: '60%' }}>
        <Viewagenda tasks={tasks} setUpdate={setUpdate} user={user} />
        <Addagenda
          date={date}
          addData={addData}
          setText={setText}
          text={text}
          deleteData={deleteData}
          textInput={textInput}
        />
      </Box>
    </div>
  );
}
