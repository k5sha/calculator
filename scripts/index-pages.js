import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { XMLParser } from 'fast-xml-parser';
import { google } from 'googleapis';

// Надежное определение путей (работает независимо от места запуска скрипта)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..'); 

async function run() {
  try {
    let keyData;

    // 1. Инициализация ключа
    if (process.env.GOOGLE_INDEXING_KEY && process.env.GOOGLE_INDEXING_KEY.length > 10) {
      keyData = JSON.parse(process.env.GOOGLE_INDEXING_KEY);
      console.log("🔑 Используем ключ из Environment Variable");
    } else {
      const keyPath = path.resolve(rootDir, 'google-key.json');
      if (!fs.existsSync(keyPath)) {
         throw new Error(`Ключ не найден по пути: ${keyPath} и переменная GOOGLE_INDEXING_KEY пуста.`);
      }
      keyData = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
      console.log("🔑 Используем ключ из файла google-key.json");
    }

    // 2. Создание клиента авторизации
    const authClient = new google.auth.JWT(
      keyData.client_email,
      null,
      keyData.private_key,
      ['https://www.googleapis.com/auth/indexing']
    );

    // ВАЖНО: Передаем authClient прямо при создании объекта indexing
    const indexing = google.indexing({
      version: 'v3',
      auth: authClient
    });

    // 3. Чтение и парсинг sitemap
    const sitemapPath = path.resolve(rootDir, 'dist/sitemap-0.xml');
    if (!fs.existsSync(sitemapPath)) {
      throw new Error(`Sitemap не найден по пути: ${sitemapPath}. Сначала запустите сборку (npm run build).`);
    }

    const xmlData = fs.readFileSync(sitemapPath, 'utf8');
    const parser = new XMLParser();
    const jsonObj = parser.parse(xmlData);
    
    let urls = [];
    const urlEntry = jsonObj.urlset?.url;
    
    if (Array.isArray(urlEntry)) {
      urls = urlEntry.map(item => item.loc);
    } else if (urlEntry?.loc) {
      urls = [urlEntry.loc];
    }

    if (urls.length === 0) {
      console.log('⚠️ В Sitemap нет URL для отправки.');
      return;
    }

    console.log(`🚀 Отправляем ${urls.length} ссылок в Google Indexing API...`);

    // 4. Отправка URL-адресов
    const results = await Promise.allSettled(
      urls.map(async (url) => {
        await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED'
          }
        });
        return url;
      })
    );

    // 5. Логирование результатов
    results.forEach((res, index) => {
      if (res.status === 'fulfilled') {
        console.log(`✅ Успешно: ${res.value}`);
      } else {
        console.error(`❌ Ошибка [${urls[index]}]: ${res.reason.message}`);
      }
    });

  } catch (error) {
    console.error('🚨 Критическая ошибка:', error.message);
    process.exit(1);
  }
}

run();