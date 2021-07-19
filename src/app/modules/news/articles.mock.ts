import { Article } from './article.model';

interface response {
  URL_that_is_not_included: string;
  status: string;
  totalResults: number;
  articles: Article[];
}

export const ARTICLES: response = {
  URL_that_is_not_included:
    'https://newsapi.org/v2/top-headlines?country=hu&category=health&apiKey=80cb891de89c47be9dd31896db6c7f2e',
  status: 'ok',
  totalResults: 5,
  articles: [
    {
      source: {
        id: null,
        name: 'Weborvos.hu',
      },
      author: null,
      title:
        'Long Covid: az agy vérellátását nehezítő gyulladás az ok? - Weborvos',
      description:
        'A koronav&iacute;rus &aacute;ldozatait boncolva tal&aacute;ltak a kutat&oacute;k olyan sejteket az agyban, amelyeknek nem lett volna ott semmi keresnival&oacute;juk.',
      url: 'https://weborvos.hu/lapszemle/long-covid-az-agy-verellatasat-nehezito-gyulladas-az-ok-266077',
      urlToImage:
        'https://weborvos.hu/data/articles/266/2660/article-266077/neurologus.jpg',
      publishedAt: new Date(Date.parse('2021-03-22T05:31:50Z')),
      content:
        'Sokan tapasztaltják a koronavírusból felépülve, hogy agyuk ködösebben mködik, mint korábban: a kutatók talán nyomára jutottak a jelenség okának.  A legvalószínbbnek most az tnik, hogy akkor alakul ki… [+1041 chars]',
    },
    {
      source: {
        id: null,
        name: 'Nyugatijelen.com',
      },
      author: 'http://www.atelier26.ro/',
      title:
        'NyugatiJelen.com - A rákot is el fogják pusztítani? - Nyugati Jelen',
      description:
        'A rákot is el fogják pusztítani – ígéri a koronavírus elleni vakcina feltalálója.',
      url: 'https://www.nyugatijelen.com/jelenido/a_rakot_is_el_fogjak_pusztitani.php',
      urlToImage: null,
      publishedAt: new Date(Date.parse('2021-03-21T16:39:00Z')),
      content:
        'A rákot is el fogják pusztítani – ígéri a koronavírus elleni vakcina feltalálója.\r\nA tudós, aki kifejlesztette az első, széleskörben alkalmazott koronavírus elleni vakcinát, nemcsak azt garantálja, h… [+2512 chars]',
    },
    {
      source: {
        id: null,
        name: 'Weborvos.hu',
      },
      author: null,
      title:
        'Megjelentek a tudnivalók az orosz vakcináról | Weborvos.hu - Weborvos',
      description:
        'K&ouml;r&uuml;ltekint&eacute;ssel alkalmazhat&oacute; az orosz vakcina, ha az &eacute;rintett&nbsp;kr&oacute;nikus vesebeteg vagy m&aacute;jbeteg, epilepszi&aacute;s.&nbsp;',
      url: 'https://weborvos.hu/gyogyszerpiac/megjelentek-a-tudnivalok-az-orosz-vakcinarol-266068',
      urlToImage:
        'https://weborvos.hu/data/articles/266/2660/article-266068/korona_vakcina_Szputnyik.jpg',
      publishedAt: new Date(Date.parse('2021-03-21T07:48:03Z')),
      content:
        'Felkerült az Országos Gyógyszerészeti és Élelmezés-egészségügyi Intézet (OGYÉI) honlapjára a betegtájékoztató Sputnik V vakcinával oltottak számára. Ebben tájékoztatnak az esetleges mellékhatásokról,… [+1769 chars]',
    },
    {
      source: {
        id: null,
        name: 'Weborvos.hu',
      },
      author: null,
      title: 'COPD: ez zajlik a tüdőben | Weborvos.hu - Weborvos',
      description:
        'Az eleinte csak nagyobb terhel&eacute;sre &ndash; p&eacute;ld&aacute;ul l&eacute;pcsőz&eacute;sn&eacute;l - jelentkező neh&eacute;zl&eacute;gz&eacute;s a folyamatok előrehalad&aacute;s&aacute;val s&uacute;lyosbodik.',
      url: 'https://weborvos.hu/egeszsegmagazin/copd-ez-zajlik-a-tudoben-266065',
      urlToImage:
        'https://weborvos.hu/data/articles/266/2660/article-266065/tudo3.jpg',
      publishedAt: new Date(Date.parse('2021-03-20T12:34:40Z')),
      content:
        'Milyen visszafordíthatatlan folyamat játszódik le a tüdben, amitl a betegek számára egyre nehezebbé válik a légzés? Errl kérdeztük dr. Hidvégi Edit tüdgyógyászt, a Tüdközpont orvosát.\r\nElssorban dohá… [+2273 chars]',
    },
    {
      source: {
        id: null,
        name: 'Beol.hu',
      },
      author: null,
      title: 'Apróhirdetés - BEOL.hu',
      description: '',
      url: 'https://www.beol.hu/aprohirdetes/',
      urlToImage:
        'https://www.beol.hu/wp-content/uploads/2017/07/+otf/1200x630/FacebookBEOL1400x900.jpg',
      publishedAt: new Date(Date.parse('2017-07-13T00:08:53Z')),
      content:
        '×Már 2 eszközön használja a szolgáltatást!\r\nEgy napon belül egyszerre maximum 2 eszközön használhatja a szolgáltatást. Használja a másik eszköz valamelyikét vagy térjen vissza holnap.\r\nÉrtem feldolgo… [+821 chars]',
    },
  ],
};
