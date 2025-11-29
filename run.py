"""
Unified launcher for NextGen Resume Screen
Starts both backend and frontend servers with a single command
"""
import subprocess
import sys
import os
import time
import webbrowser
from pathlib import Path

def print_banner():
    print("\n" + "="*60)
    print("  NextGen Resume Screen - 3D Enhanced")
    print("="*60 + "\n")

def check_node_installed():
    """Check if Node.js is installed"""
    try:
        result = subprocess.run(['node', '--version'], 
                              capture_output=True, 
                              text=True,
                              shell=True)
        return result.returncode == 0
    except:
        return False

def start_backend():
    """Start the FastAPI backend server"""
    print("🚀 Starting Backend Server (Port 8001)...")
    backend_dir = Path(__file__).parent / "backend"
    
    # Start uvicorn on port 8001 instead of 8000
    backend_process = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--reload", "--port", "8001"],
        cwd=backend_dir,
        shell=True
    )
    return backend_process

def start_frontend():
    """Start the Vite frontend dev server"""
    print("🎨 Starting Frontend Server (Port 5173)...")
    frontend_dir = Path(__file__).parent / "frontend"
    
    # Check if node_modules exists
    node_modules = frontend_dir / "node_modules"
    if not node_modules.exists():
        print("📦 Installing frontend dependencies (first time only)...")
        subprocess.run(['npm', 'install'], cwd=frontend_dir, shell=True)
    
    frontend_process = subprocess.Popen(
        ['npm', 'run', 'dev'],
        cwd=frontend_dir,
        shell=True
    )
    return frontend_process

def main():
    print_banner()
    
    # Check prerequisites
    if not check_node_installed():
        print("❌ Error: Node.js is not installed!")
        print("   Please install Node.js from https://nodejs.org/")
        sys.exit(1)
    
    try:
        # Start both servers
        backend_proc = start_backend()
        time.sleep(2)  # Give backend time to start
        
        frontend_proc = start_frontend()
        time.sleep(3)  # Give frontend time to start
        
        print("\n" + "="*60)
        print("✅ Both servers are running!")
        print("="*60)
        print("\n📍 Backend:  http://localhost:8001")
        print("📍 Frontend: http://localhost:5173")
        print("\n💡 Opening browser in 3 seconds...")
        print("⚠️  Press Ctrl+C to stop both servers\n")
        
        # Open browser
        time.sleep(3)
        webbrowser.open('http://localhost:5173')
        
        # Wait for processes
        backend_proc.wait()
        frontend_proc.wait()
        
    except KeyboardInterrupt:
        print("\n\n🛑 Shutting down servers...")
        backend_proc.terminate()
        frontend_proc.terminate()
        print("✅ Servers stopped successfully!")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
