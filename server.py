#!/usr/bin/env python3
import http.server, ssl, socketserver, os

PORT = 8443
os.chdir(os.path.dirname(os.path.abspath(__file__)))
Handler = http.server.SimpleHTTPRequestHandler

# Créer un contexte SSL moderne
context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain('./server.pem', './server.pem')

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
    print(f"Serveur démarré sur https://localhost:{PORT}")
    print("Note: Acceptez l'avertissement de sécurité dans votre navigateur.")
    print("Sur Android, accédez à https://[votre-ip]:8443")
    httpd.serve_forever() 