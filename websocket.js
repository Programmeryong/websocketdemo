const ws = require('nodejs-websocket'); //调用websocket

const TYPE_TRUE = 0;  //进入
const TYPE_FALSE = 1; //退出
const TYPE_MSG = 2;   //正常 

let count = 0;
const server = ws.createServer(conn => {
    console.log('有新的连接加入');

    count++;
    conn.userName = `用户${count}`;
    broadcast({
      name:`系统通知`,
      type:TYPE_TRUE,
      msg:`${conn.userName}进入聊天室`,
      time:new Date().toLocaleTimeString()
    });

    //接收到的数据
    conn.on('text',data =>{
      // broadcast(`${conn.userName}`data);
      broadcast({
        name:conn.userName,
        type:TYPE_MSG,
        msg:data,
        time:new Date().toLocaleTimeString()
      });
    })
    //浏览器关闭的时候
    conn.on('close',data =>{
      count--;
      broadcast({
        name:`系统通知`,
        type:TYPE_FALSE,
        msg:`${conn.userName}离开了聊天室`,
        time:new Date().toLocaleTimeString()
      });
    })
    //连接失败
    conn.on('error',data =>{
      console.log("连接异常");
    })

    function broadcast(msg){
      server.connections.forEach(item => {
        item.send(JSON.stringify(msg));
      })
    }
    
});
server.listen(8848, function() {  //开启的服务端口号
    console.log((new Date()) + ' Server is listening on port 8848');
});