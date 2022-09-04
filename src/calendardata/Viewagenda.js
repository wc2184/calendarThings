import {
  Button,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '..';

const Viewagenda = ({ tasks, setUpdate, user }) => {
  //   useEffect(() => {
  //     const renderTasks = async () => {
  //       const querySnapshot = await getDocs(collection(db, 'users'));
  //       const agendas = [];
  //       querySnapshot.forEach(doc => {
  //         agendas.push(doc.data());
  //         //   console.log(doc.data());
  //         //   console.log(
  //         //     `${doc.id} => ${doc.data().date.toDate().toISOString().split('T')[0]}`
  //         //   );
  //       });
  //       setTasks(agendas);
  //     };
  //     renderTasks();
  //   }, []);
  //   tasks && console.log(tasks[0].first);
  return (
    <div>
      {!tasks && (
        <TableContainer sx={{ width: '90vw' }}>
          <Table size="lg">
            <Thead>
              <Tr>
                <Th w="80%" sx={{ overflow: 'hidden' }}>
                  Deliverable
                </Th>
                <Th w="20%" sx={{ overflow: 'hidden' }}>
                  Time
                </Th>
                <Th sx={{ overflow: 'hidden' }} isNumeric></Th>
              </Tr>
            </Thead>
          </Table>
        </TableContainer>
      )}
      {/* {tasks && tasks.length == 0 && (
        <TableContainer sx={{ width: '90vw' }}>
          <Table size="lg">
            <Thead>
              <Tr>
                <Th w="30%">Task</Th>
                <Th w="50%">Deliverable</Th>
                <Th w="20%" isNumeric>
                  Time
                </Th>
              </Tr>
            </Thead>
          </Table>
        </TableContainer>
      )} */}
      {tasks && (
        <TableContainer sx={{ width: '90vw' }}>
          <Table size="lg">
            <Thead>
              <Tr>
                <Th w="80%" sx={{ overflow: 'hidden' }}>
                  Deliverable
                </Th>
                <Th w="20%" sx={{ overflow: 'hidden' }}>
                  Time
                </Th>
                <Th sx={{ overflow: 'hidden' }} isNumeric></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tasks.map(task => {
                return (
                  <Tr key={Math.floor(100000000 + Math.random() * 900000000)}>
                    {/* <Td>{task.id}</Td> */}
                    <Td w="80%">{task.first}</Td>
                    <Td w="20%" isNumeric>
                      {/* <input type="datetime-local" value="2017-06-30T16:30" /> */}
                      <Input
                        placeholder="Select Date and Time"
                        size="md"
                        type="datetime-local"
                        defaultValue={task.time}
                        onBlur={async e => {
                          //   e.target.setAttribute('value', e.target.value);
                          console.log(e.target.value);
                          console.log(task.id);
                          let realDate = new Date(
                            new Date(e.target.value).setHours(0, 0, 0, 0)
                          );
                          await updateDoc(doc(db, user.uid, task.id), {
                            time: e.target.value,
                            date: realDate,
                          });
                          setUpdate(task.id);
                        }}
                      />
                      {/* {
                        new Date(task.date.seconds * 1000)
                          .toISOString()
                          .split('T')[0]
                      } */}
                      {/* <input type="datetime-local" /> */}
                    </Td>
                    <Td>
                      <Button
                        onClick={async () => {
                          await deleteDoc(doc(db, user.uid, task.id));
                          setUpdate(task.id);
                        }}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                  /* <div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div>
                      {
                        new Date(task.date.seconds * 1000)
                          .toISOString()
                          .split('T')[0]
                      }
                    </div>
                    <div>{task.born}</div>
                    <Button
                      onClick={async () => {
                        await deleteDoc(doc(db, 'users', task.id));
                        setUpdate(task.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div> */
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {/* {JSON.stringify(tasks)} */}
      {/* <Button
        onClick={() => {
          console.log(tasks);
        }}
      >
        View stuff
      </Button> */}
    </div>
  );
};
export default Viewagenda;
