document.addEventListener('DOMContentLoaded', function () {
  AOS.init();

  // 헤더 탭메뉴 열고 닫기 ##################################
  const headerTabMenu = document.querySelector('.header-tab-menu');
  if (!headerTabMenu) return;

  const tabBtn = headerTabMenu.querySelector('.tab-btn');
  const nav = headerTabMenu.querySelector('.nav');
  const gnb = headerTabMenu.querySelector('.gnb');
  const menuItems = headerTabMenu.querySelectorAll('.gnb > li');

  // 탭 버튼 클릭: 메뉴 열고 닫기
  tabBtn.addEventListener('click', function () {
    const isActive = nav.classList.toggle('active');
    tabBtn.classList.toggle('active');

    // 닫힐 때 모두 초기화
    if (!isActive) {
      menuItems.forEach(item => item.classList.remove('active'));
      gnb.classList.remove('active'); // gnb 높이 초기화
    }
  });

  // 헤더 탭 아코디언 ##################################
  menuItems.forEach(item => {
    const toggleBtn = item.querySelector('.depth-01');

    toggleBtn.addEventListener('click', function (e) {
      e.preventDefault();

      // 다른 메뉴 닫기
      menuItems.forEach(i => {
        if (i !== item) i.classList.remove('active');
      });

      // 클릭한 메뉴 토글
      const isOpening = !item.classList.contains('active');
      item.classList.toggle('active');

      // gnb 높이 조절
      if (isOpening) {
        gnb.classList.add('active');
      } else {
        gnb.classList.remove('active');
      }
    });
  });

  // 스크롤시 사라지고 나타나는 헤더 ##################################
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;

    // 스크롤이 50 이상 내려갔을 때만 작동
    if (currentScrollY > 50) {
      if (currentScrollY < lastScrollY) {
        // 위로 스크롤 중 → 메뉴 나타나기
        headerTabMenu.classList.add('show');
      } else {
        // 아래로 스크롤 중 → 메뉴 숨기기
        headerTabMenu.classList.remove('show');
      }
    } else {
      // 스크롤이 100 미만이면 무조건 숨김
      headerTabMenu.classList.remove('show');
    }

    lastScrollY = currentScrollY;
  });

  // 메인비주얼 마우스 바라보는 민트 블롭 ##################################
  const box = document.querySelector('.mint-blob');

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    targetX = x * -80;
    targetY = y * 80;
  });

  function animate() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    // transform에 기존 translate(-50%, -50%) 유지 + 회전 추가
    box.style.transform = `translate(-50%, -50%) rotateX(${currentY}deg) rotateY(${currentX}deg)`;

    requestAnimationFrame(animate);
  }

  animate();

  // 섹션 1 가로스크롤 ##################################
  let section01Top = document.querySelector('.section-01').offsetTop;
  console.log(section01Top)
  window.addEventListener('scroll', () => {
    let transformX = -1 / 15 * window.scrollY + section01Top / 15

    if (transformX < -100) {
      document.querySelector('.scrollX').style.transform = `translateX(-100vw)`
    } else if (transformX < 0) {
      document.querySelector('.scrollX').style.transform = `translateX(${transformX}vw)`
    }
  });

  // 섹션 2 카드 2 --- 이미지 호버시 카드 배경 제어 ###################
  let card02 = document.querySelector('.card-02');
  let imgItem1 = card02.querySelector('.item-1');
  let imgItem2 = card02.querySelector('.item-2');
  let imgItem3 = card02.querySelector('.item-3');

  let title = card02.querySelector('.title-text .title');
  let sub = card02.querySelector('.title-text .sub span');

  function addHoverClass(className) {
    // 클래스 먼저 처리
    card02.classList.remove('hover-1', 'hover-2', 'hover-3');
    card02.classList.add(className);

    // 텍스트 변경
    if (className === 'hover-1') {
      title.innerHTML = '시대별 미술 작품';
      sub.innerHTML = '기원전부터 동시대까지 시대별로 정리한 미술 작품을 감상해 보세요.';
    } else if (className === 'hover-2') {
      title.innerHTML = '작가별 미술 작품';
      sub.innerHTML = '국내외 미술 작가의 이름별로 정리한 미술 작품을 감상해 보세요.';
    } else if (className === 'hover-3') {
      title.innerHTML = '소장처별 미술 작품';
      sub.innerHTML = '국립 중앙 박물관, 시카고 미술관, 루브르 박물관 등 세계 미술관에서 소장하고 있는 작품을 감상해 보세요.';
    }
  }

  function removeHoverClass() {
    // 클래스 제거
    card02.classList.remove('hover-1', 'hover-2', 'hover-3');

    // 텍스트 초기화
    title.innerHTML = '시대별 미술 작품';
    sub.innerHTML = '기원전부터 동시대까지 시대별로 정리한 미술 작품을 감상해 보세요.';
  }

  // 이벤트 연결
  imgItem1.addEventListener('mouseenter', () => addHoverClass('hover-1'));
  imgItem1.addEventListener('mouseleave', removeHoverClass);

  imgItem2.addEventListener('mouseenter', () => addHoverClass('hover-2'));
  imgItem2.addEventListener('mouseleave', removeHoverClass);

  imgItem3.addEventListener('mouseenter', () => addHoverClass('hover-3'));
  imgItem3.addEventListener('mouseleave', removeHoverClass);


  // 섹션 3 스와이퍼 데모 ##################################
  var demoSwiper = new Swiper(".demoSwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  // 섹션 4 스와이퍼 데모 ##################################
  var slideSwiper = new Swiper(".slideSwiper", {
    loop: true,
    speed: 2000,
    freeMode: true,

    slidesPerView: 1.3,
    spaceBetween: 20,

    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },

    breakpoints: {
      1800: {
        spaceBetween: 30,
        slidesPerView: 4.3,
      },

      1240: {
        spaceBetween: 30,
        slidesPerView: 3.3,
      },

      500: {
        spaceBetween: 30,
        slidesPerView: 2.3,
      },
    },
  });
});
