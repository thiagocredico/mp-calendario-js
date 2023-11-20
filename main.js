import './style.css';

let currentLanguage = 'pt';

const languages = [
  { code: 'pt', name: 'Português' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'ar', name: 'العربية' }, // Árabe
  { code: 'bg', name: 'Български' }, // Búlgaro
  { code: 'ca', name: 'Català' }, // Catalão
  { code: 'zh-Hans', name: '简体中文' }, // Chinês simplificado
  { code: 'cs', name: 'Čeština' }, // Tcheco
  { code: 'da', name: 'Dansk' }, // Dinamarquês
  { code: 'de', name: 'Deutsch' }, // Alemão
  { code: 'el', name: 'Ελληνικά' }, // Grego
  { code: 'fi', name: 'Suomi' }, // Finlandês
  { code: 'fr', name: 'Français' }, // Francês
  { code: 'he', name: 'עברית' }, // Hebraico
  { code: 'hu', name: 'Magyar' }, // Húngaro
  { code: 'is', name: 'Íslenska' }, // Islandês
  { code: 'it', name: 'Italiano' }, // Italiano
  { code: 'ja', name: '日本語' }, // Japonês
  { code: 'ko', name: '한국어' }, // Coreano
  { code: 'nl', name: 'Nederlands' }, // Holandês
  { code: 'no', name: 'Norsk' }, // Norueguês
  { code: 'pl', name: 'Polski' }, // Polonês
  { code: 'rm', name: 'Rumantsch' }, // Romanche
  { code: 'ro', name: 'Română' }, // Romeno
  { code: 'ru', name: 'Pусский' }, // Russo
  { code: 'hr', name: 'Hrvatski' }, // Croata
  { code: 'sk', name: 'Slovenčina' }, // Eslovaco
  { code: 'sq', name: 'Shqip' }, // Albanês
  { code: 'sv', name: 'Svenska' }, // Sueco
  { code: 'th', name: 'ไทย' }, // Tailandês
  { code: 'tr', name: 'Türkçe' }, // Turco
  { code: 'ur', name: 'اردو' }, // Urdu
  { code: 'id', name: 'Bahasa Indonesia' }, // Indonésio
  { code: 'uk', name: 'Українська' }, // Ucraniano
  { code: 'be', name: 'Беларуская' }, // Bielorrusso
  { code: 'sl', name: 'Slovenščina' }, // Esloveno
  { code: 'et', name: 'Eesti' }, // Estoniano
  { code: 'lv', name: 'Latviešu' }, // Letão
  { code: 'lt', name: 'Lietuvių' }, // Lituano
  { code: 'tg', name: 'Тоҷикӣ' }, // Tajique
  { code: 'fa', name: 'فارسی' }, // Persa
  { code: 'vi', name: 'Tiếng Việt' }, // Vietnamita
  { code: 'hy', name: 'Հայերեն' }, // Armênio
  { code: 'az', name: 'Azərbaycan dili' }, // Azerbaijano
  { code: 'eu', name: 'Euskara' }, // Basco
  { code: 'hsb', name: 'Hornjoserbšćina' }, // Sorábio superior
  { code: 'mk', name: 'Македонски' }, // Macedônio
  { code: 'tn', name: 'Setswana' }, // Tswana
  { code: 'xh', name: 'isiXhosa' }, // Xhosa
  { code: 'zu', name: 'isiZulu' }, // Zulu
  { code: 'af', name: 'Afrikaans' }, // Africâner
  { code: 'ka', name: 'ქართული' }, // Georgiano
  { code: 'fo', name: 'Føroyskt' }, // Feroês
  { code: 'hi', name: 'हिन्दी' }, // Hindi
  { code: 'mt', name: 'Malti' }, // Maltês
  { code: 'se', name: 'Davvisámegiella' }, // Sami do norte
  { code: 'ga', name: 'Gaeilge' }, // Irlandês
  { code: 'ms', name: 'Bahasa Melayu' }, // Malaio
  { code: 'kk', name: 'Қазақ тілі' }, // Cazaque
  { code: 'ky', name: 'Кыргызча' }, // Quirguiz
  { code: 'sw', name: 'Kiswahili' }, // Suaíli
  { code: 'tk', name: 'Türkmen' }, // Turcomano
  { code: 'tt', name: 'Татарча' }, // Tártaro
];

document.addEventListener('DOMContentLoaded', () => {
  const languageSelector = document.getElementById('languageSelector');

  languages.forEach((lang) => {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.name;
    languageSelector.appendChild(option);
  });

  const monthElement = document.querySelector('.current-date .month');
  const yearElement = document.querySelector('.current-date .year');
  const prevNextIcon = document.querySelectorAll('.icons');
  const weeksTag = document.querySelector('.weeks');
  const daysTag = document.querySelector('.days');
  let date = new Date();
  let currYear = date.getFullYear();
  let currMonth = date.getMonth();

  const renderCalendar = () => {
    const formattedDate = new Intl.DateTimeFormat([currentLanguage], {
      month: 'long',
      year: 'numeric',
    }).format(new Date(currYear, currMonth, 1));
    const [month, , year] = formattedDate.split(' ');
    monthElement.textContent = month;
    yearElement.textContent = year || currYear;

    const daysOfWeek = getDaysOfWeek();

    weeksTag.innerHTML = daysOfWeek.map((day) => `<li>${day}</li>`).join('');

    const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayofMonth = new Date(
      currYear,
      currMonth,
      lastDateofMonth,
    ).getDay();
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    const daysInMonth = [];

    for (let i = firstDayofMonth; i > 0; i--) {
      daysInMonth.push({ day: lastDateofLastMonth - i + 1, inactive: true });
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      daysInMonth.push({ day: i, inactive: false });
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      daysInMonth.push({ day: i - lastDayofMonth + 1, inactive: true });
    }

    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    for (let i = 0; i < daysInMonth.length; i++) {
      const { day, inactive } = daysInMonth[i];
      if (!inactive && currMonth === todayMonth && currYear === todayYear && day === todayDate) {
        daysInMonth[i].active = true;
        break;
      }
    }

    daysTag.innerHTML = daysInMonth
      .map(
        ({ day, inactive, active }) =>
          `<li class="${inactive ? 'inactive' : ''} ${active ? 'active' : ''}">${day}</li>`,
      )
      .join('');
  };

  prevNextIcon.forEach((icon) => {
    icon.addEventListener('click', () => {
      currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;
      if (currMonth < 0 || currMonth > 11) {
        date = new Date(currYear, currMonth, new Date().getDate());
        currYear = date.getFullYear();
        currMonth = date.getMonth();
      } else {
        date = new Date();
      }
      renderCalendar();
    });
  });

  renderCalendar();

  languageSelector.addEventListener('change', function () {
    currentLanguage = this.value;
    renderCalendar();
  });
});

function getDaysOfWeek() {
  const date = new Date();
  const days = [];
  const formatter = new Intl.DateTimeFormat([currentLanguage], {
    weekday: 'short',
  });

  date.setDate(date.getDate() - date.getDay());

  for (let i = 0; i < 7; i++) {
    const formattedDay = formatter.format(date);
    const day = currentLanguage === 'pt' ? formattedDay.slice(0, -1) : formattedDay;
    days.push(day);
    date.setDate(date.getDate() + 1);
  }

  return days;
}

document.querySelector('#app').innerHTML = `
<div class="calendar-container">
  <h1 class="title">Calendário</h1>
  <div class="language-select">
    <span class="select-text">
      Selecione uma linguagem
    </span>
    <select id="languageSelector"> </select>
  </div>
  <div class="wrapper">
    <header>
      <span id="prev" class="icons">
        <img src="./left-arrow.svg" alt="next" width="30" height="30" />
      </span>
      <p class="current-date">
        <span class="month"></span>
        <span class="year"></span>
      </p>
      <span id="next" class="icons">
        <img src="./right-arrow.svg" alt="next" width="30" height="30" />
      </span>      
    </header>
    <div class="calendar">
      <ul class="weeks"></ul>
      <ul class="days"></ul>
    </div>
  </div>
</div>
`;
