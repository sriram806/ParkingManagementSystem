<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;margin: 0;padding: 2rem;background-color: #f7f9fc;color: #333;">

  <h1 style="text-align: center;font-size: 2.5rem;margin-bottom: 1rem;" >🚗 Parking Management System</h1>
  <section style="max-width: 900px;margin: 2rem auto;background: #fff;padding: 2rem;border-radius: 10px;box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
    <p>
      A full-stack Parking Management System with <strong>Node.js + Express + MongoDB</strong> for the backend and a 
      <strong>React.js + TypeScript</strong> frontend. Designed to manage and monitor vehicle entries/exits, generate logs, 
      enforce role-based access, and provide data export and visualization tools.
    </p>
  </section>

  <section style="max-width: 900px;margin: 2rem auto;background: #fff;padding: 2rem;border-radius: 10px;box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
    <h2 style="text-align: center;font-size: 2.0rem;margin-bottom: 0.5rem;">📂 Project Structure</h2>
    <p>Folder layout and structure overview (to be filled as needed).</p>
  </section>

  <section style="max-width: 900px;margin: 2rem auto;background: #fff;padding: 2rem;border-radius: 10px;box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);">
    <h2 style="text-align: center;font-size: 2.0rem;margin-bottom: 0.5rem;">✨ Features</h2>

    <h3 style="text-align: center;font-size: 1.5rem;margin-bottom: 1.0rem;">🔧 Backend (Node.js + Express + MongoDB)</h3>
    <ul style="list-style: none;padding-left: 0;" class="icon-list">
      <li style="margin-bottom: 0.5rem;font-size: 1.05rem;">🔐 JWT-based authentication</li>
      <li style="margin-bottom: 0.5rem;font-size: 1.05rem;">👥 Role-based access (Admin & Guard)</li>
      <li style="margin-bottom: 0.5rem;font-size: 1.05rem;">🚙 Vehicle entry & exit logs</li>
      <li style="margin-bottom: 0.5rem;font-size: 1.05rem;">📁 RESTful API endpoints</li>
      <li style="margin-bottom: 0.5rem;font-size: 1.05rem;">🧩 Modular route/controller structure</li>
      <li style="margin-bottom: 0.5rem;font-size: 1.05rem;">🧠 MongoDB integration via Mongoose</li>
      <li style="margin-bottom: 0.5rem;font-size: 1.05rem;">📤 PDF/CSV export capability (planned)</li>
      <li style="margin-bottom: 0.5rem;font-size: 1.05rem;">🌐 WebSocket support for real-time updates</li>
    </ul>

    <h3 style="text-align: center;font-size: 1.5rem;margin-bottom: 1.0rem;">💻 Frontend (React + TypeScript)</h3>
    <ul style="list-style: none;padding-left: 0;" class="icon-list">
      <li style="margin-bottom: 0.5rem;font-size: 1.05rem;">📋 Dashboard with vehicle logs</li>
      <li style="margin-bottom: 0.5rem;font-size: 1.05rem;">🔍 Filter by type, status, guard, shift</li>
      <li style="margin-bottom: 0.5rem;font-size: 1.05rem;">🔎 Keyword search</li>
      <li style="margin-bottom: 0.5rem;font-size: 1.05rem;">📁 Export logs to CSV</li>
      <li style="margin-bottom: 0.5rem;font-size: 1.05rem;">🚘 Icons based on vehicle type</li>
      <li style="margin-bottom: 0.5rem;font-size: 1.05rem;">🔐 Role-based UI rendering</li>
      <li style="margin-bottom: 0.5rem;font-size: 1.05rem;">🌙 Dark mode (planned)</li>
      <li style="margin-bottom: 0.5rem;font-size: 1.05rem;">📈 Charts for analytics (planned)</li>
    </ul>
  </section>

  <section>
    <h2 style="text-align: center;font-size: 2.0rem;margin-bottom: 0.5rem;">👥 User Roles</h2>
    <table style="width: 100%;border-collapse: collapse;margin-top: 1rem;">
      <thead>
        <tr>
          <th style="background-color: #f0f0f0;font-weight: 600;padding: 0.75rem 1rem;text-align: left;border-bottom: 1px solid #ccc;">Role</th>
          <th style="background-color: #f0f0f0;font-weight: 600;padding: 0.75rem 1rem;text-align: left;border-bottom: 1px solid #ccc;">Permissions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 0.75rem 1rem;text-align: left;border-bottom: 1px solid #ccc;">Admin</td>
          <td style="padding: 0.75rem 1rem;text-align: left;border-bottom: 1px solid #ccc;">View logs, manage users, export data, analytics</td>
        </tr>
        <tr>
          <td style="padding: 0.75rem 1rem;text-align: left;border-bottom: 1px solid #ccc;">Guard</td>
          <td style="padding: 0.75rem 1rem;text-align: left;border-bottom: 1px solid #ccc;">Add vehicle entries/exits, view own shift logs</td>
        </tr>
      </tbody>
    </table>
  </section>

  <footer style="margin-top: 3rem;">
    <h1 sstyle="text-align: center;font-size: 2.5rem;margin-bottom: 1rem;">👨‍💻 Developed by</h1>
    <h2 style="text-align: center;font-size: 2.0rem;margin-bottom: 0.5rem;">NexFlow Tech</h2>
    <h3 style="text-align: center;font-size: 1.5rem;margin-bottom: 1.0rem;">Built with ❤️ by Team NexFlow</h3>
  </footer>

</body>
</html>
