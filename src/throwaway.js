{
  tasks && (
    <TableContainer>
      {tasks.map(task => {
        return (
          <div>
            <div>{task.id}</div>
            <div>{task.first}</div>
            <div>{task.last}</div>
            <div>
              {new Date(task.date.seconds * 1000).toISOString().split('T')[0]}
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
          </div>
        );
      })}
    </TableContainer>
  );
}
