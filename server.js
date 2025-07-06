const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")
const { Server } = require("socket.io")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    })

    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    })

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("sendMessage", (data) => {
            console.log("Message sent:", data);
            io.emit("newMessage", data);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    server.listen(3000, (err) => {
        if (err) throw err
        console.log("> Ready on http://localhost:3000")
    })
});

