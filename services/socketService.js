

// const { InMemorySessionStore } = require("./sessionStore");
// const sessionStore = new InMemorySessionStore();

// let authClient = (socket,) => {
//     const sessionID = socket.handshake.auth.sessionID;
//
//     if (sessionID) {
// // find existing session
//         const session = sessionStore.findSession(sessionID);
//         if (session) {
//             socket.sessionID = sessionID;
//             socket.userID = session.userID;
//             socket.username = session.username;
//             return next();
//         }
//     }
//
//     const username = socket.handshake.auth.username;
//     if (!username) {
//         return next(new Error("invalid username"));
//     }
//
//     socket.sessionID = Math.floor(Math.random() * 10000000000000000000);
//     socket.userID = Math.floor(Math.random() * 10000000000000000000);
//     socket.username = username;
// }