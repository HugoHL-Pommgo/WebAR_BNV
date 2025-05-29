import http.server
import ssl
import os

server_address = ('0.0.0.0', 8443)
httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)

# Créer un certificat auto-signé si nécessaire
if not os.path.exists('cert.pem'):
    os.system('openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=localhost"')

# Créer le contexte SSL
ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain(certfile='cert.pem', keyfile='key.pem')

# Configurer SSL
httpd.socket = ssl_context.wrap_socket(httpd.socket, server_side=True)

print("Serveur démarré sur https://localhost:8443")
print("Note: Comme le certificat est auto-signé, vous devrez accepter l'avertissement de sécurité dans votre navigateur.")
print("Sur Android, accédez à https://[votre-ip]:8443")
httpd.serve_forever() 