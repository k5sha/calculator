import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';
import { google } from 'googleapis';

async function run() {
  try {
    const keyData = process.env.GOOGLE_INDEXING_KEY 
      ? JSON.parse(process.env.GOOGLE_INDEXING_KEY)
      : JSON.parse(fs.readFileSync(path.resolve('./google-key.json'), 'utf8'));

    const auth = new google.auth.JWT(
      keyData.client_email,
      null,
      keyData.private_key,
      ['https://www.googleapis.com/auth/indexing']
    );

    const sitemapPath = path.resolve('./dist/sitemap-0.xml');
    if (!fs.existsSync(sitemapPath)) {
      process.exit(1);
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

    if (urls.length === 0) return;

    const indexing = google.indexing('v3');
    
    const results = await Promise.allSettled(
      urls.map(async (url) => {
        await indexing.urlNotifications.publish({
          auth,
          requestBody: { url, type: 'URL_UPDATED' }
        });
        return url;
      })
    );

    results.forEach((res, index) => {
      if (res.status === 'fulfilled') {
        console.log(`✅ ${res.value}`);
      } else {
        console.error(`❌ ${urls[index]}: ${res.reason.message}`);
      }
    });

  } catch (error) {
    process.exit(1);
  }
}

run();