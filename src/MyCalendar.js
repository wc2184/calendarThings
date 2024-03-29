import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
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
import { v4 as uuidv4 } from 'uuid';

export function MyCalendar({ user }) {
  const auth = getAuth();
  //
  let now = new Date();
  now.setHours(0, 0, 0, 0);
  const [date, setDate] = useState(now);
  const [tasks, setTasks] = useState();
  const [text, setText] = useState('');
  const [update, setUpdate] = useState();
  const [getAll, setGetAll] = useState(false);
  const textInput = useRef(null);

  //
  const changeDate = date => {
    setGetAll(false);
    setDate(date);
  };

  const handler = e => {
    if (e.keyCode === 191) {
      textInput.current.focus();
    }
  };
  useEffect(() => {
    window.addEventListener('keyup', handler, false);

    const renderTasks = async () => {
      if (getAll === true) {
        const usersRef = collection(db, user.uid);
        const querySnapshot = await getDocs(
          usersRef,
          where('user', '==', user.uid)
        );
        const agendas = [];
        querySnapshot.forEach(doc => {
          let obj = doc.data();

          obj.id = doc.id;
          agendas.push(obj);
          // agendas.push(doc.data(), doc.id);
          //
          //
          //     `${doc.id} => ${doc.data().date.toDate().toISOString().split('T')[0]}`
          //   );
        });

        agendas.sort((a, b) => {
          return a.time > b.time ? 1 : b.time > a.time ? -1 : 0;
        });

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
          //
          //
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
  }, [update, date, getAll]);

  const addData = async () => {
    try {
      const docRef = await addDoc(collection(db, user.uid), {
        first: text ? text : 'Nothing added',
        last: 'Lovelace',
        born: 1815,
        date: date,
        time: date.toISOString().split('T')[0] + 'T00:00',
        user: auth.currentUser.uid,
        checked: false,

        // 2022-09-04T00:00
      });

      setText('');
      setUpdate(uuidv4());
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
    stuff.forEach(async docc => {
      await deleteDoc(doc(db, user.uid, docc.id));
    });
    // setText(text);
    setTimeout(() => {
      setUpdate(Math.random());
    }, 500);
  };
  //
  //
  //
  const pushToToday = async () => {
    // Create a reference to the cities collection
    const usersRef = collection(db, user.uid);

    // Create a query against the collection.
    const q = query(
      usersRef,
      // where('user', '==', user.uid),
      where('checked', '==', false)
    );
    const querySnapshot = await getDocs(q);
    const agendas = [];

    querySnapshot.forEach(async docu => {
      let obj = docu.data();

      obj.id = docu.id;
      await updateDoc(doc(db, user.uid, obj.id), {
        date: now,
        time: now.toISOString().split('T')[0] + 'T00:00',
        // checked: !theDoc.data().checked,
      });
      // agendas.push(obj);
      // agendas.push(doc.data(), doc.id);
      //
      //
      //     `${doc.id} => ${doc.data().date.toDate().toISOString().split('T')[0]}`
      //   );
      setUpdate(uuidv4());
    });
  };

  return (
    <div className="calendar">
      {tasks && (
        <>
          <Box sx={{ flex: '0 1 20%', flexDirection: 'row', display: 'flex' }}>
            <Box
              sx={{
                flex: '1 0 50%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <MyCal
                sx={{ height: '20vh' }}
                onChange={changeDate}
                value={date}
              />
            </Box>

            {/* <Spacer></Spacer> */}
            <Box
              sx={{
                display: 'flex',
                flex: '1 0 50%',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Flex
                sx={{ display: 'flex', flexDirection: 'column' }}
                justifyContent={'center'}
                alignItems="center"
              >
                <Button
                  colorScheme="green"
                  variant={getAll == true ? 'solid' : 'outline'}
                  onClick={() => {
                    setGetAll(true);
                  }}
                  sx={{ width: '120px', height: '50px' }}
                >
                  View all
                </Button>
                <br />
                <br />
                {/* push all unchecked in view all to today */}
                <Button
                  colorScheme="green"
                  disabled={!getAll}
                  variant={getAll == true ? 'solid' : 'outline'}
                  onClick={() => {
                    pushToToday();
                  }}
                  sx={{ width: '120px', height: '50px' }}
                >
                  Push undone
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
                  sx={{ width: '120px', height: '50px' }}
                >
                  Today
                </Button>
              </Flex>
            </Box>
          </Box>
          <Box sx={{ marginTop: '25px', height: '50vh', flex: '1 0 70%' }}>
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
        </>
      )}
    </div>
  );
}
