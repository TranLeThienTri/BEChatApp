// const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMwLCJlbWFpbCI6InRoaWVudHJpLnRyYW5rMTdAZ21haWwuY29tIiwiaWF0IjoxNjkzMzI4ODQzLCJleHAiOjE2OTM5MzM2NDN9.AfgJw7FYOzvFFvryIK9cKGtIXxUAh-XYDoKEbOWKcA0";
var socket = io.connect("http://localhost:3000", {
    extraHeaders: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMwLCJlbWFpbCI6InRoaWVudHJpLnRyYW5rMTdAZ21haWwuY29tIiwiaWF0IjoxNjkzMzI4ODQzLCJleHAiOjE2OTM5MzM2NDN9.AfgJw7FYOzvFFvryIK9cKGtIXxUAh-XYDoKEbOWKcA0`,
    },
});

socket.on("allOldMessages", (payload) => {
    $("#chatMessages").append(`<div>${payload.sendID}: ${payload.msg}</div>`);
});


socket.on("newMessage", (message) => {
    $("#chatMessages").append(`<div>${message.un}: ${message.ms}</div>`);
});


$("#users").ready(async () => {
    const res = await fetch(`http://localhost:3000/user`, {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMwLCJlbWFpbCI6InRoaWVudHJpLnRyYW5rMTdAZ21haWwuY29tIiwiaWF0IjoxNjkzMzI4ODQzLCJleHAiOjE2OTM5MzM2NDN9.AfgJw7FYOzvFFvryIK9cKGtIXxUAh-XYDoKEbOWKcA0`,
        },
    });
    const us = await res.json();
    us.map(async (r) => {
        $("#users").append(
            `<div class="user" value="${r.id}">${r.userName} </div>`
        );
    });
});

$(document).ready(function () {
    let roomName = null;
    let idReceiver = null;
    let idMe = null

    $("#users").each(function () {
        $(this).click(async function (data) {
            const res = await fetch(`http://localhost:3000/user/me`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMwLCJlbWFpbCI6InRoaWVudHJpLnRyYW5rMTdAZ21haWwuY29tIiwiaWF0IjoxNjkzMzI4ODQzLCJleHAiOjE2OTM5MzM2NDN9.AfgJw7FYOzvFFvryIK9cKGtIXxUAh-XYDoKEbOWKcA0`,
                },
            });
            const me = await res.json();
            idMe = me.id;
            socket.emit("leaveRoom", roomName)
            $("#chatMessages").html("");
            idReceiver = Number(data.target.getAttribute("value"));
            $("#repUser").html("");
            $("#repUser").append(`<h3>${data.target.textContent}</h3>`);
            roomName = room(idMe,idReceiver);
            console.log("join room: ", roomName);
            socket.emit("joinRoom", roomName);
            socket.emit("oldMessages", { idMe, idReceiver });
        });
    });
    $("#sendPrivateMessage").click( function () {
        const msg = $("#messageInput").val();
        console.log(msg);
        socket.emit("sendMessage", { roomName, idMe, idReceiver, msg });
        $("#messageInput").val("");
    });
});

function room(idMe,idReceiver){
    return idMe <= idReceiver
    ? `${idMe}-${idReceiver}`
    : `${idReceiver}-${idMe}`;
}
