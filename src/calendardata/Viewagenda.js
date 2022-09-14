import {
  Button,
  Checkbox,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '..';
import { v4 as uuidv4 } from 'uuid';

const Viewagenda = ({ tasks, setUpdate, user }) => {
  const [loading, setLoading] = useState(false);
  console.log(window.navigator.userAgent.match(/iPhone/i), 'device');
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
  // console.log(tasks);
  return (
    <div>
      {!tasks && (
        <TableContainer sx={{ width: '95vw' }}>
          <Table size="lg">
            <Thead>
              <Tr>
                <Th w="90%" sx={{ overflow: 'hidden' }}>
                  Deliverable
                </Th>
                <Th w="10%" sx={{ overflow: 'hidden' }}>
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
        <TableContainer sx={{ width: '100%' }}>
          <Table size="lg">
            <Thead>
              <Tr>
                <Th maxW="40vw" sx={{ overflow: 'hidden' }}>
                  Deliverable
                </Th>
                <Th w="10%" sx={{ overflow: 'hidden' }}>
                  Time
                </Th>
                <Th sx={{ overflow: 'hidden' }} isNumeric></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tasks.map(task => {
                return (
                  <Tr key={uuidv4()}>
                    {/* <Td>{task.id}</Td> */}
                    <Td maxW="50vw" sx={{ display: 'flex' }}>
                      {window.navigator.userAgent.match(/iPhone/i) ? (
                        <Select placeholder="i">
                          <option>{task.first}</option>
                        </Select>
                      ) : null}

                      <Tooltip
                        bg="red.600"
                        placement="bottom"
                        offset={[-19, -10]}
                        openDelay="500"
                        label={task.first}
                        fontSize="md"
                      >
                        <Text
                          minH="40px"
                          // minH="60px"
                          sx={{ display: 'flex' }}
                          key={Math.floor(
                            100000000 + Math.random() * 900000000
                          )}
                          as={task.checked ? 'del' : ''}
                          onClick={async () => {
                            //   console.log('hi');
                            //   console.log(task.id, 'id of task');
                            //   console.log(task.checked, 'task.checked things');
                            //   const docRef = doc(db, user.uid, task.id);
                            //   const theDoc = await getDoc(docRef);

                            await updateDoc(doc(db, user.uid, task.id), {
                              checked: !task.checked,
                              // checked: !theDoc.data().checked,
                            });
                            setUpdate(uuidv4());
                            // setLoading(false);
                          }}
                          sx={{ overflow: 'hidden' }}
                        >
                          {task.first}
                        </Text>
                      </Tooltip>
                    </Td>
                    <Td w="10%" isNumeric>
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
                          setUpdate(uuidv4());
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
                          setUpdate(uuidv4());
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
