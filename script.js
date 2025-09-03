/* Сброс стилей и базовые правила */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #f5f7fa;
  color: #333;
  line-height: 1.5;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

header h1 {
  font-size: 3rem;
  color: #3498db;
  margin-bottom: 10px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #3498db;
  font-weight: 600;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #2980b9;
}

/* Основной контент */
main {
  max-width: 900px;
  margin: 0 auto;
}

.content-section h2 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.content-section h3 {
  margin-top: 25px;
  margin-bottom: 10px;
  color: #34495e;
}

.content-section p,
.content-section ul,
.content-section form {
  margin-bottom: 15px;
}

.content-section ul {
  padding-left: 20px;
  list-style-type: disc;
}

.content-section ul li {
  margin-bottom: 6px;
}

/* Форма входа и регистрации */
.auth-section {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.login-container,
.register-container {
  flex: 1 1 350px;
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
}

.auth-section h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #2980b9;
}

.login-form label,
.register-form label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #555;
}

.login-form input,
.register-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.login-form input:focus,
.register-form input:focus {
  outline: none;
  border-color: #3498db;
}

.login-form button,
.register-form button {
  width: 100%;
  padding: 14px;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-form button:hover,
.register-form button:hover {
  background-color: #2980b9;
}

/* Форма загрузки курса (в контенте) */
.content-section form input[type="text"],
.content-section form textarea,
.content-section form input[type="file"] {
  width: 100%;
  padding: 8px;
  margin-top: 6px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.content-section form button {
  background-color: #27ae60;
  border: none;
  color: white;
  padding: 12px 20px;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.content-section form button:hover {
  background-color: #1e8449;
}

/* Footer */
footer {
  text-align: center;
  margin-top: 50px;
  padding: 10px;
  color: #777;
  font-size: 0.9rem;
}
