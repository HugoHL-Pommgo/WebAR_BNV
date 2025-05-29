#!/usr/bin/env python3
import http.server,ssl,socketserver,os
PORT=8443
os.chdir(os.path.dirname(os.path.abspath(__file__)))
Handler=http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("",PORT),Handler) as httpd:
    httpd.socket=ssl.wrap_socket(httpd.socket,certfile='./server.pem',keyfile='./server.pem',server_side=True)
    print(f"Serveur démarré sur https://localhost:{PORT}")
    print("Note: Acceptez l'avertissement de sécurité dans votre navigateur.")
    print("Sur Android, accédez à https://[votre-ip]:8443")
    httpd.serve_forever() 