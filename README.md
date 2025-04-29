<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Parking Management System</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 2rem;
      background-color: #f7f9fc;
      color: #333;
    }

    h1, h2, h3 {
      text-align: center;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    section {
      max-width: 900px;
      margin: 2rem auto;
      background: #fff;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    ul.icon-list {
      list-style: none;
      padding-left: 0;
    }

    ul.icon-list li {
      margin-bottom: 0.5rem;
      font-size: 1.05rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }

    table th, table td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid #ccc;
    }

    table th {
      background-color: #f0f0f0;
      font-weight: 600;
    }

    footer {
      margin-top: 3rem;
    }
  </style>
</head>
<body>

  <h1>🚗 Parking Management System</h1>
  <section>
    <p>
      A full-stack Parking Management System with <strong>Node.js + Express + MongoDB</strong> for the backend and a 
      <strong>React.js + TypeScript</strong> frontend. Designed to manage and monitor vehicle entries/exits, generate logs, 
      enforce role-based access, and provide data export and visualization tools.
    </p>
  </section>

  <section>
    <h2>📂 Project Structure</h2>
    <p>Folder layout and structure overview (to be filled as needed).</p>
  </section>

  <section>
    <h2>✨ Features</h2>

    <h3>🔧 Backend (Node.js + Express + MongoDB)</h3>
    <ul class="icon-list">
      <li>🔐 JWT-based authentication</li>
      <li>👥 Role-based access (Admin & Guard)</li>
      <li>🚙 Vehicle entry & exit logs</li>
      <li>📁 RESTful API endpoints</li>
      <li>🧩 Modular route/controller structure</li>
      <li>🧠 MongoDB integration via Mongoose</li>
      <li>📤 PDF/CSV export capability (planned)</li>
      <li>🌐 WebSocket support for real-time updates</li>
    </ul>

    <h3>💻 Frontend (React + TypeScript)</h3>
    <ul class="icon-list">
      <li>📋 Dashboard with vehicle logs</li>
      <li>🔍 Filter by type, status, guard, shift</li>
      <li>🔎 Keyword search</li>
      <li>📁 Export logs to CSV</li>
      <li>🚘 Icons based on vehicle type</li>
      <li>🔐 Role-based UI rendering</li>
      <li>🌙 Dark mode (planned)</li>
      <li>📈 Charts for analytics (planned)</li>
    </ul>
  </section>

  <section>
    <h2>👥 User Roles</h2>
    <table>
      <thead>
        <tr>
          <th>Role</th>
          <th>Permissions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Admin</td>
          <td>View logs, manage users, export data, analytics</td>
        </tr>
        <tr>
          <td>Guard</td>
          <td>Add vehicle entries/exits, view own shift logs</td>
        </tr>
      </tbody>
    </table>
  </section>

  <footer>
    <h1>👨‍💻 Developed by</h1>
    <h2>NexFlow Tech</h2>
    <h3>Built with ❤️ by Team NexFlow</h3>
  </footer>

</body>
</html>
