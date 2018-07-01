const socketsHandler = (io) => {
  io.on('connection', (socketConn) => {
    console.log('Client connected:', socketConn.id);

    socket.on('joined game', (data) => {
      //TODO: handle this
    })

    socket.on('game action', (data) => {
      //TODO: handle this
    })

    socket.on('disconnect', (socketConn) => {
      console.log('Client disconnected with ID:', socketConn.id);
      //TODO: handle this
    });

  });
}

export default socketsHandler;