
# TaskFlow - Drag & Drop Task Manager

🚀 **A sleek, interactive task management app** with project organization, priority-based sorting, and smooth drag-and-drop functionality. Built with Laravel, Inertia.js, React, and TypeScript.

![TaskFlow Screenshot](screenshot.png)

## ✨ Features

### **Task Management**

- ✅ Add/edit/delete tasks with priorities
- 🖱️ Intuitive drag-and-drop reordering
- 🏷️ Organize by projects with color-coding
- 🔢 Automatic priority numbering

### **Project System**

- 🎨 Color-coded projects
- 🗂️ Filter tasks by project
- ➕ Quick project creation

### **UI/UX**

- ✨ Animated transitions with Framer Motion
- 📱 Fully responsive design
- 🎛️ Keyboard-friendly editing

## 🛠️ Tech Stack

**Frontend**

- React 18 + TypeScript
- Inertia.js
- Tailwind CSS
- Framer Motion (animations)
- dnd-kit (drag-and-drop)

**Backend**

- Laravel 10
- MySQL

**State Management**

- Zustand

## 🚀 Installation

### Prerequisites

- PHP ≥ 8.1
- Composer
- Node.js ≥ 16
- MySQL

### Setup Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/taskflow.git
   cd taskflow
   ```
2. Install dependencies:

   ```bash
   composer install
   npm install
   ```
3. Configure environment:

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
4. Set up database:

   ```bash
   php artisan migrate --seed
   ```
5. Build assets:

   ```bash
   npm run build
   ```
6. Start development servers:

   ```bash
   php artisan serve
   npm run dev
   ```

## 📂 Project Structure

```
taskflow/
├── app/
│   ├── Http/Controllers/        # Laravel controllers
│   ├── Models/                  # Eloquent models
├── resources/
│   ├── js/                      # React components
│   │   ├── components/          # UI components
│   │   ├── store/               # Zustand store
│   │   ├── types/               # TypeScript types
├── routes/                      # Laravel routes
├── public/                      # Compiled assets
```

## 🧑‍💻 Development

### Common Commands

```bash
# Watch frontend changes
npm run dev

# Run PHP tests
php artisan test

# Generate IDE helpers
php artisan ide-helper:generate
```

### Coding Standards

- PHP: Follow PSR-12
- JavaScript: ESLint + Prettier
- TypeScript: Strict mode enabled

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

MIT License - see [LICENSE](LICENSE) for details.

---

**Enjoy task management made delightful!** ✨
For questions or support, please open an issue on GitHub.

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development/)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
