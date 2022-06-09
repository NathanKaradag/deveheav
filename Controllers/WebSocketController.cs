using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using ClassesX;
using System.Linq;

namespace somethingg.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WebSocketsController : ControllerBase
    {
        private readonly ILogger<WebSocketsController> _logger;
        static private List<Room> Rooms = new List<Room>();
        static private List<WebSocket> ConnectedClientsList = new List<WebSocket>();
        private Room room;
        
        public WebSocketsController(ILogger<WebSocketsController> logger) //,IWebsocketHandler websocketHandler
        {
            _logger = logger;
        }

        [HttpGet("/ws")]
        public async Task Get(string name)
        {
          if (HttpContext.WebSockets.IsWebSocketRequest)
          {
            using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
            var context = ControllerContext.HttpContext;

            if(!Rooms.Any((x) => x.RoomName == name)){
                Rooms.Add(new Room(name));
            }
            var temp = Rooms.Where(x => x.RoomName == name);
            this.room = temp.ToArray()[0];
            this.room.ConnectClient(webSocket);


            Console.WriteLine($"Room --- {name}");
            foreach(var x in this.room.ConnectedClients){
                Console.WriteLine($"--- {x}");
            }

            _logger.Log(LogLevel.Information, "WebSocket connection established");

            await Echo(webSocket);
          }
          else
          {
              HttpContext.Response.StatusCode = 400;
          }
        }
        
        private async Task Echo(WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            _logger.Log(LogLevel.Information, "Message received from Client");

            while (!result.CloseStatus.HasValue)
            {
                var serverMsg = Encoding.UTF8.GetBytes($"{Encoding.UTF8.GetString(buffer)}");
                //Console.WriteLine(System.Text.Encoding.Default.GetString(serverMsg));

                foreach(WebSocket x in room.ConnectedClients){
                    if(webSocket != x){
                        await x.SendAsync(new ArraySegment<byte>(serverMsg, 0, serverMsg.Length), result.MessageType, result.EndOfMessage, CancellationToken.None);
                        _logger.Log(LogLevel.Information, "Message sent to Client");
                        buffer = new byte[1024 * 4];
                    }
                }

                result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                _logger.Log(LogLevel.Information, "Message received from Client");
            }

            await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
            _logger.Log(LogLevel.Information, "WebSocket connection closed");
            
            room.DisconnectClient(webSocket);

            //int indexToRemove = ConnectedClientsList.IndexOf(webSocket);
            //ConnectedClientsList.RemoveAt(indexToRemove);
        }
    }
}