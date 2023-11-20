import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const monthElement = document.querySelector('.current-date .month');
  const yearElement = document.querySelector('.current-date .year');
  const prevNextIcon = document.querySelectorAll('.icons');
  let date = new Date();
  let currYear = date.getFullYear();
  let currMonth = date.getMonth();

  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];

  const renderCalendar = () => {
    monthElement.textContent = months[currMonth];
    yearElement.textContent = currYear;

    const daysTag = document.querySelector('.days');
    daysTag.innerHTML = '';

    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = '';

    for (let i = firstDayofMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday =
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
          ? 'active'
          : '';
      liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    daysTag.innerHTML = liTag;
  };

  prevNextIcon.forEach(icon => {
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
});

document.querySelector('#app').innerHTML = `
    <div class="wrapper">
      <header>
          <span id="prev" class="icons">
            <img src="./public/left-arrow.svg" alt="next" width="30" height="30" />
          </span>
          <p class="current-date">
            <span class="month"></span>
            <span class="year"></span>
          </p>
          <span id="next" class="icons">
            <img src="./public/right-arrow.svg" alt="next" width="30" height="30" />
          </span>      
      </header>
      <div class="calendar">
        <ul class="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul class="days"></ul>
      </div>
    </div>
`;
