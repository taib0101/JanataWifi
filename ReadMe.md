# JanataWiFi Full Stack Project

### About

I developed a full-stack **CRUD** web application with **React, Vite, TailwindCSS, Django, MySQL** within **4 days**, resolving complex errors. Upload Frontend on **Netlify**, backend on **PythonAnywhere**.It was My first **Django project**. I developed this project for **JanataWiFi** Organisation.

### 🚀 Live Demo

- **Frontend Live Link:** [https://taibjanatawifi.netlify.app/](https://taibjanatawifi.netlify.app/)
- **Backend Live Link:** [https://taib0110.pythonanywhere.com/](https://taib0110.pythonanywhere.com/)

### Resolved Error

1.  **Initial Setup:**

    - Backend developed with Django and PostgreSQL, hosted on Aiven.
    - Django API deployed to PythonAnywhere.

    - **Initial Error:** PythonAnywhere failed to establish a persistent TCP/IP connection to the Aiven PostgreSQL database, resulting in connection refusal.

    - **Solution:** To resolve this, I switched to using PythonAnywhere's free hosted MySQL database.

2.  **Connection Per Operation:**

    - Implemented a connection-per-operation strategy,
      establishing a new database connection and performing cursor operations for each CRUD request.

    - **Subsequent Error:** PythonAnywhere terminate short-lived connections. causing intermittent
      OperationalError.

    - **Solution:** To Prevent this problem, I implemented per connection for per operation.

3. **Rendering Large Data**
    - The file contained 15,932 documents with data.

    - **Performance Issue:** Rendering this large dataset on the webpage resulted in slow performance and a poor user experience.
    
    - **Solution:** Implemented `react-virtualized` for efficient rendering of large datasets.

## 🛠 Technologies Used

### Frontend With JavaScript:

- [Vite](https://vitejs.dev/) - Fast development build tool
- [React](https://react.dev/) - JavaScript library for UI development
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework

### Backend With Python:

- [Django](https://www.djangoproject.com/) - Python web framework
- [MySQL](https://www.mysql.com/) - Relational database management system

## 🔧 Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Version 23.4.0
- Python &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Version 3.10.12

### Clone the Repository

```sh
git clone https://github.com/taib0101/JanataWifi
cd JanataWifit
```

### Setup Frontend

```sh
cd frontend
npm install
npm run dev
```

### Setup Backend

```sh
cd backend
sudo apt update
sudo apt install python3-pip
sudo apt install python3-django
pip install django
pip install django-cors-headers
pip install mysql-connector-python
python3 manage.py runserver --noreload
```
