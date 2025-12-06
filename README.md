# 🍲 MyRecipeApp  
Fullstack webová aplikace pro správu receptů, postavená na **React (Vite) + PHP + MySQL**.
Na projektu stále **pracuji**. 

Aplikace umožňuje registraci, přihlášení uživatele, práci se sessions na backendu, podmíněné zobrazení částí UI a bezpečné odhlašování.  
Projekt je navržen pro lokální běh pomocí **Vite dev serveru** (frontend) a **XAMPP** (backend + MySQL).

---

## 💎 Co lze vyzkoušet
- Registrovat se
- Přihlásit se
- Odhlásit se

---

## ✨ Funkcionality

### 🔐 Autentizace
- Registrace uživatele (PHP + MySQL)
- Přihlášení pomocí PHP session (bez JWT)
- Ověření přihlášeného uživatele (`check.php`)
- Odhlášení se zrušením session a session cookie
- Podmíněné vykreslování v Reactu podle `currentUser`

### 🧭 Navigace
- Dynamický Header reagující na stav přihlášení
- Přesměrování po přihlášení/odhlášení
- React Router

### 💡 Frontend
- React + Vite
- Bootstrap 5 komponenty
- FontAwesome ikony
- Čistě oddělená struktura komponent
- Fetch API komunikace s PHP backendem

### 🛠 Backend
- PHP 8
- MySQL (přes PDO)
- Bezpečné hashování hesel (`password_hash`)
- Prepared statements
- Session management
- CORS + credentials podpora pro React

---

## 🧰 Technologie

### Frontend
- React
- Vite
- React Router
- Bootstrap 5
- FontAwesome

### Backend
- PHP (procedural + PDO)
- MySQL
- Sessions

---

## Vysvětlivky
🟩 - Vysvětluje část kódu
🟧 - Odkazuje na komunikaci se serverem
🟦 - Poukazuje na proměnné

---

## 🧭 Návod ke spuštění

1. **Stažení projektu**
   - Stáhni nebo naklonuj repozitář do svého počítače.
   - Umísti celý projekt do XAMPP složky, např.:
     ```
     C:/xampp/htdocs/projekty/MyRecipeApp
     ```

2. **Instalace frontendu**
   - Otevři terminál ve složce:
     ```
     /frontend
     ```
   - Nainstaluj balíčky:
     ```
     npm install
     ```
   - Vytvoř produkční build:
     ```
     npm run build
     ```
   - Ve složce `frontend/dist` se vygeneruje hotový frontend.

3. **Umístění buildu**
   - Otevři složku:
     ```
     frontend/dist
     ```
   - Zkopíruj *obsah* této složky (soubor `index.html` + složku `assets`)
   - Vlož je přímo do složky hlavního projektu:
     ```
     /MyRecipeApp/
     ```
     (tam, kde je i složka `backend`)

4. **Import databáze**
   - Spusť **XAMPP** (Apache + MySQL).
   - Otevři **phpMyAdmin** v prohlížeči:
     ```
     http://localhost/phpmyadmin
     ```
   - Vytvoř novou databázi (např. `myrecipeapp`).
   - V levém menu ji vyber a v záložce **Import** nahraj `.sql` soubor ze složky:
     ```
     /database_sql
     ```
   - Import dokonči.

5. **Nastavení připojení k databázi**
   - Ve složce:
     ```
     /backend/config
     ```
     najdeš soubor `database_example.php`.
   - Zkopíruj ho a přejmenuj na:
     ```
     database.php
     ```
   - V souboru `database.php` uprav přístupové údaje k databázi:
     - název databáze  
     - uživatelské jmén
     - heslo
   - Ulož změny.



6. **Spuštění aplikace**
   - Ujisti se, že v XAMPP běží **Apache** a **MySQL**.
   - V prohlížeči přejdi na adresu:
     ```text
     http://localhost/projekty/MyRecipeApp/
     ```
   - Aplikace by se měla načíst a fungovat s napojením na databázi.

