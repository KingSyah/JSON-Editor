#!/usr/bin/env python3
"""
Simple HTTP Server untuk JSON Editor
Menjalankan aplikasi web JSON Editor dengan Python built-in server

@author: KingSyah
@copyright: © 2025 KingSyah
@version: 2.0
@description: HTTP Server for JSON Editor MTE USK Publications
"""

import http.server
import socketserver
import os
import sys
import webbrowser
import json
from urllib.parse import urlparse
from datetime import datetime

class JSONEditorHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def do_GET(self):
        """Handle GET requests"""
        parsed_path = urlparse(self.path)
        
        # Serve static files
        if parsed_path.path.endswith(('.html', '.js', '.css', '.json')):
            return super().do_GET()
        
        # Default to index.html
        if parsed_path.path == '/':
            self.path = '/index.html'
            return super().do_GET()
        
        return super().do_GET()
    
    def do_POST(self):
        """Handle POST requests for saving JSON files"""
        if self.path == '/api/save':
            try:
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data.decode('utf-8'))
                
                filename = data.get('filename', 'data.json')
                json_content = data.get('content', {})

                # Ensure downloads directory exists
                os.makedirs('downloads', exist_ok=True)

                # Save file
                filepath = os.path.join('downloads', filename)
                with open(filepath, 'w', encoding='utf-8') as f:
                    json.dump(json_content, f, indent=2, ensure_ascii=False)
                
                # Send success response
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                response = {
                    'success': True,
                    'message': f'File {filename} berhasil disimpan',
                    'timestamp': datetime.now().isoformat()
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
                
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                response = {
                    'success': False,
                    'message': f'Error: {str(e)}'
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_OPTIONS(self):
        """Handle OPTIONS requests for CORS"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def end_headers(self):
        """Add CORS headers to all responses"""
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def main():
    """Main function to start the server"""
    PORT = 8000
    
    # Check if port is available
    try:
        with socketserver.TCPServer(("", PORT), JSONEditorHandler) as httpd:
            print("=" * 60)
            print("🚀 JSON Editor Server Started!")
            print("=" * 60)
            print(f"📍 Server Address: http://localhost:{PORT}")
            print(f"📁 Serving Directory: {os.getcwd()}")
            print("=" * 60)
            print("📋 Available Endpoints:")
            print(f"   • Main App: http://localhost:{PORT}")
            print(f"   • Save API: http://localhost:{PORT}/api/save")
            print("=" * 60)
            print("⚡ Features:")
            print("   • Drag & Drop JSON files")
            print("   • Auto-detect form fields")
            print("   • Real-time editing")
            print("   • Data validation")
            print("   • Download edited files")
            print("=" * 60)
            print("🔧 Controls:")
            print("   • Press Ctrl+C to stop server")
            print("   • Browser will open automatically")
            print("=" * 60)
            
            # Open browser automatically
            try:
                webbrowser.open(f'http://localhost:{PORT}')
                print("🌐 Browser opened automatically")
            except:
                print("⚠️  Please open browser manually")
            
            print("\n🟢 Server is running... Press Ctrl+C to stop\n")
            
            # Start server
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} is already in use!")
            print(f"💡 Try using a different port or stop the existing server")
            
            # Try alternative ports
            for alt_port in [8001, 8080, 3000, 5000]:
                try:
                    with socketserver.TCPServer(("", alt_port), JSONEditorHandler) as httpd:
                        print(f"✅ Using alternative port: {alt_port}")
                        print(f"🌐 Open: http://localhost:{alt_port}")
                        webbrowser.open(f'http://localhost:{alt_port}')
                        httpd.serve_forever()
                        break
                except OSError:
                    continue
            else:
                print("❌ No available ports found!")
                sys.exit(1)
        else:
            print(f"❌ Server error: {e}")
            sys.exit(1)
    
    except KeyboardInterrupt:
        print("\n" + "=" * 60)
        print("🛑 Server stopped by user")
        print("👋 Thank you for using JSON Editor!")
        print("=" * 60)
        sys.exit(0)

if __name__ == "__main__":
    # Check if we're in the right directory
    if not os.path.exists('index.html'):
        print("❌ Error: index.html not found!")
        print("💡 Please run this script from the JSON Editor directory")
        sys.exit(1)
    
    # Create downloads directory if it doesn't exist
    if not os.path.exists('downloads'):
        os.makedirs('downloads')
        print("📁 Created downloads directory")
    
    main()
