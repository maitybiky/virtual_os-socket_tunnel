# Virtual OS

**Project Description:**

This project features a web interface designed especially for smartphones that includes a terminal, file manager, and code editor. Users can download the CLI program, **vos**, for Linux, log in with their credentials, and establish a socket tunnel between their local PC and the web client. This setup allows remote access to the local PC directly from the web terminal, enabling seamless management and coding on the go.
system design <a href="https://app.eraser.io/workspace/I51LrmRuX4BWp7aqkOku?origin=share">here</a>

## Run Locally

Clone the project

```bash
  git clone git@github.com:maitybiky/virtual_os-socket_tunnel.git
```

Go to the project directory

```bash
  cd virtual_os-socket_tunnel
```

Install cli programm for local pc

```bash
  cd cli && npm run build # use node 18 while building
```

Start the cli

```bash
  ./vos
```

Go to the virtual_os_server directory in new tab

```bash
  cd virtual_os_server
```

```bash
  npm install
  npm start # default port 8000
```

Go to the virtual_os_client directory in new tab

```bash
  cd virtual_os_client
```

```bash
  npm install
  npm run dev # default port 3000
```
