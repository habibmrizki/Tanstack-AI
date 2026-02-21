<!-- Welcome to your new TanStack Start app!

# Getting Started

To run this application:

```bash
npm install
npm run dev
```

# Building For Production

To build this application for production:

```bash
npm run build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
npm run test
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

### Removing Tailwind CSS

If you prefer not to use Tailwind CSS:

1. Remove the demo pages in `src/routes/demo/`
2. Replace the Tailwind import in `src/styles.css` with your own styles
3. Remove `tailwindcss()` from the plugins array in `vite.config.ts`
4. Uninstall the packages: `npm install @tailwindcss/vite tailwindcss -D`



## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you render `{children}` in the `shellComponent`.

Here is an example layout that includes a header:

```tsx
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'My App' },
    ],
  }),
  shellComponent: ({ children }) => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        {children}
        <Scripts />
      </body>
    </html>
  ),
})
```

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

## Server Functions

TanStack Start provides server functions that allow you to write server-side code that seamlessly integrates with your client components.

```tsx
import { createServerFn } from '@tanstack/react-start'

const getServerTime = createServerFn({
  method: 'GET',
}).handler(async () => {
  return new Date().toISOString()
})

// Use in a component
function MyComponent() {
  const [time, setTime] = useState('')

  useEffect(() => {
    getServerTime().then(setTime)
  }, [])

  return <div>Server time: {time}</div>
}
```

## API Routes

You can create API routes by using the `server` property in your route definitions:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: () => json({ message: 'Hello, World!' }),
    },
  },
})
```

## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/people')({
  loader: async () => {
    const response = await fetch('https://swapi.dev/api/people')
    return response.json()
  },
  component: PeopleComponent,
})

function PeopleComponent() {
  const data = Route.useLoaderData()
  return (
    <ul>
      {data.results.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  )
}
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

# Demo files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

For TanStack Start specific documentation, visit [TanStack Start](https://tanstack.com/start). -->

# 🌟 Proyek TanStack Start & OpenRouter AI

Selamat datang di aplikasi web modern Anda! Proyek ini dibangun menggunakan ekosistem terbaru **TanStack Start** dan **TypeScript**, serta terintegrasi dengan kecerdasan buatan (AI) melalui **OpenRouter**.
Aplikasi ini sudah dikonfigurasi dan siap digunakan untuk membangun antarmuka web yang cepat, aman, tangguh (_scalable_), dan cerdas.

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: [TanStack Start](https://tanstack.com/start)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **AI API**: [OpenRouter](https://openrouter.ai/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

---

## 🚀 Memulai Proyek (Getting Started)

Jika Anda orang lain (atau anggota tim) yang baru saja mendapatkan proyek ini, ikuti langkah-langkah berikut untuk menginstall dan menjalankan aplikasi ini secara lokal di komputer Anda:

### 1. Kloning Repositori & Install Dependensi

Buka terminal Anda dan jalankan perintah berikut:

```bash
# (Lompati langkah ini jika Anda sudah mengunduh foldernya)
git clone <url-repo-proyek-ini>
cd <nama-folder-repo>
# Install semua dependensi NPM
npm install
2. Pengaturan Environment (API Key OpenRouter)
Aplikasi ini menggunakan OpenRouter untuk fitur AI. Anda (dan siapapun yang menjalankan proyek ini) perlu mengatur API Key secara lokal sebelum menjalankan aplikasi agar AI dapat membalas pesan.

Buka situs OpenRouter dan buat akun/login.
Buat API Key baru di dashboard Keys OpenRouter.
Di dalam direktori utama (root) proyek Anda, buat file baru bernama .env. (Atau ubah nama .env.example menjadi .env jika sudah tersedia)
Buka file .env tersebut dan tambahkan baris berikut beserta API Key yang Anda dapatkan:
env
VITE_OPENROUTER_API_KEY=sk-or-v1-masukkan_api_key_openrouter_anda_di_sini
OPENROUTER_API_KEY=sk-or-v1-masukkan_api_key_openrouter_anda_di_sini
⚠️ PERINGATAN KEAMANAN: Jangan pernah mengunggah (commit) file .env yang berisi API Key asli Anda ke public repository (misal: GitHub). Pastikan .env sudah masuk ke dalam daftar .gitignore.

3. Jalankan Server Pengembangan (Development)
Setelah dependensi terinstal dan file .env sudah dikonfigurasi, jalankan perintah:

bash
npm run dev
Aplikasi kini siap diakses di web browser (biasanya berjalan di http://localhost:3000 atau port yang tertera di terminal). Layar akan dimuat ulang secara otomatis ketika Anda melakukan perubahan kode.

💻 Penggunaan Klien & Integrasi AI (Client-Side Usage)
Karena proyek ini menggunakan TypeScript, integrasi API OpenRouter bisa dilakukan dan diketik (typed) dengan baik.

Berikut adalah contoh bagaimana Anda bisa memanggil API OpenRouter menggunakan fetch standar langsung dari antarmuka klien pengguna (Client-side):

tsx
import { useState } from 'react'
export function ChatComponent() {
  const [response, setResponse] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const handleSendPrompt = async () => {
    setLoading(true)
    try {
      // Mengakses variabel VITE_ melalui import.meta.env
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY

      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          // Referensi OpenRouter: URL situs web dan nama aplikasi untuk peringkat
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Aplikasi AI Saya"
        },
        body: JSON.stringify({
          // Anda bisa mengganti modelnya dengan bebas (misal: google/gemini-2.5-pro, dll)
          model: "google/gemini-2.5-pro",
          messages: [
            { role: "user", content: "Halo, tolong ceritakan lelucon singkat." }
          ]
        })
      })
      const data = await res.json()
      setResponse(data.choices[0].message.content)
    } catch (error) {
      console.error("Gagal mengambil respon AI:", error)
      setResponse("Terjadi kesalahan sistem saat menghubungi AI.")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <button
        onClick={handleSendPrompt}
        disabled={loading}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'AI sedang berpikir...' : 'Uji Coba Kirim Pesan AI'}
      </button>

      {response && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-gray-800">
          <p><strong>Balasan AI:</strong> {response}</p>
        </div>
      )}
    </div>
  )
}
📌 Catatan Mendesak tentang Keamanan (Klien vs Server):
Mengekspos API Key melalui variabel awalan VITE_ membuatnya dapat dilihat di sisi browser pengguna akhir jika digunakan di tahap Production. Jika aplikasi ini hanya untuk belajar lokal, tidak apa-apa. Namun jika proyek ini diluncurkan untuk publik (deploy), sangat diwajibkan untuk memindahkan logika pemanggilan API ini ke sisi server API Routes/Server Functions agar Key OpenRouter Anda tidak dicuri orang.

⚡ Eksekusi AI yang Aman (Server Functions)
(Sangat Direkomendasikan)
Fitur terbaik TanStack Start adalah Server Functions. Anda dapat memanggil API OpenRouter dengan aman secara rahasia di sebuah function dan mengirim hanya hasil teksnya ke klien:

tsx
// 1. Buat Server Function rahasia di suatu file (misal: src/server/ai.ts)
import { createServerFn } from '@tanstack/react-start'
export const fetchSecureAIResponse = createServerFn({
  method: 'POST',
}).handler(async (ctx) => {
  // ✅ AMAN: Ini berjalan murni di server NodeJS, tersembunyi dari browser.
  // Variabel tidak memerlukan singkatan VITE_
  const apiKey = process.env.OPENROUTER_API_KEY
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-pro",
      messages: [{ role: "user", content: ctx.data.prompt }]
    })
  })
  const json = await res.json()
  // Hanya melemparkan jawaban akhir ke client React Anda
  return json.choices[0].message.content
})
🛠️ Perintah Utama Singkat
Perintah	Deskripsi
npm run dev	Menjalankan server lokal pengembangan (Development).
npm run build	Melakukan kompilasi optimalisasi agar siap produksi (Production).
npm run start	Menjalankan server yang sebelumnya sudah di-build.
📖 Sumber Belajar Mendalam
Teruslah eksplorasi kemampuan dari instrumen Anda lewat tautan ini:

🚀 Dokumentasi Dasar TanStack Start
📘 Metodologi TypeScript
🤖 Mengeksplorasi Model AI di OpenRouter
```
