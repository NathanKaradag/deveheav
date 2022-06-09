using System; 
using System.Collections.Generic;
using System.Net.WebSockets;

namespace ClassesX{
    public class Room{
        public string RoomName;
        public List<WebSocket> ConnectedClients;

        public Room(string roomName){
            this.RoomName = roomName;
            this.ConnectedClients = new List<WebSocket>();
        }
        public void ConnectClient(WebSocket webSocket){
            ConnectedClients.Add(webSocket);
        }
        public void DisconnectClient(WebSocket webSocket){
            int indexToRemove = ConnectedClients.IndexOf(webSocket);
            ConnectedClients.RemoveAt(indexToRemove);
        }

    }
}