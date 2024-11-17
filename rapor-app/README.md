# Hastane Rapor Sistemi

Bu proje, hastane raporlarını yönetmek için geliştirilmiştir. Backend Node.js ve Express.js kullanılarak geliştirilmiş olup, frontend React ile Vite kullanılarak oluşturulmuştur.

---

## Gereksinimler

- **Node.js**
- **MongoDB**
- **NPM** veya **Yarn**

---

## Kurulum Adımları

### .Env dosyası

```env
MONGO_URL=<MongoDB bağlantı adresiniz>
PORT=<Backend için port>
JWT_SECRET=<JWT gizli anahtar>
CLOUDINARY_CLOUD_NAME=<Cloudinary Cloud Name>
CLOUDINARY_API_KEY=<Cloudinary API Key>
CLOUDINARY_API_SECRET=<Cloudinary API Secret>
NODE_ENV=development
```

---

### Backend Kurulumu

- Projenin Ana(Root) klasöründe terminal açıp aşağıdaki komutları çalıştırın:

```bash
npm install
```

```bash
npm run dev
```

---

### Frontend Kurulumu

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

---

- ### Varsayılan Url'ler

- Backend: http://localhost:5000
- Frontend: http://localhost:5173

---

- ## Kullanım

- ### Kullanıcı Kayıt ve Giriş
- Kullanıcılar, kayıt olarak yeni bir hesap oluşturabilir veya mevcut bir hesaba giriş yapabilir.
- Kayıt olduktan sonra, veritabanında oluşan ilk kullanıcı admin olarak belirlenir.
- Admin kullanıcı, yeni çalışan tanımlayabilir, silebilir ve kendisi Laborant olmadığı için yeni rapor tanımlamaya yetkisi yoktur sadece hastane yönticisidir.
- Admin kullanıcı tarafından oluşturulan Laborantlar, hesaplarına giriş yaptıktan sonra şifrelerini değiştirebilir ve rapor tanımlama, düzenleme ve silme işlemlerini gerçekleştirebilir.
- Not: Kullanıcı ve Laborant(Technician) normal kullanıcılar ile farklı veritabanı modelinde kurulduğu için sadece admin tarafından tanımlanabilecek 1. kullanıcıdan sonra kurulan hesaplar User statüsünde oldukları için hiç bir özelliğe yetkileri olmayacak sadece **Ana Sayfa**'dan daha önce Laborantlar tarafından oluşturulmuş Raporları görüntüleyip filtreleyebileceklerdir.
