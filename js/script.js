$(window).on('load', function () {
  //   $(".carousel__inner").slick({
  //     speed: 1200,
  //     // adaptiveHeight: true,
  //     // autoplay: true,
  //     // autoplaySpeed: 2000,
  //     prevArrow:
  //       '<button type="button" class="slick-prev"><img src="icons/left.png" alt="product" /></button>',

  //     nextArrow:
  //       '<button type="button" class="slick-next"><img src="icons/right.png" alt="product" /></button>,',

  //     responsive: [
  //       {
  //         breakpoint: 992,
  //         settings: {
  //           dots: true,
  //           arrows: false,
  //         },
  //       },
  //     ],
  //   });
  // });

  const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    responsive: {
      900: {
        nav: true,
      },
    },
  })

  document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev')
  })

  document
    .querySelector('.next')
    .addEventListener('click', () => slider.goTo('next'))

  $('ul.cataloge__tabs').on(
    'click',
    'li:not(.cataloge__tab_active)',
    function () {
      $(this)
        .addClass('cataloge__tab_active')
        .siblings()
        .removeClass('cataloge__tab_active')
        .closest('div.container')
        .find('div.cataloge__content')
        .removeClass('cataloge__content_active')
        .eq($(this).index())
        .addClass('cataloge__content_active')
    }
  )

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault()
        $('.cataloge-item__content')
          .eq(i)
          .toggleClass('cataloge-item__content_active')
        $('.cataloge-item__list')
          .eq(i)
          .toggleClass('cataloge-item__list_active')
      })
    })
  }

  toggleSlide('.cataloge-item__link')
  toggleSlide('.cataloge-item__back')

  //Modal

  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow')
  })

  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow')
  })

  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.cataloge-item__subtitle').eq(i).text())
      $('.feed-form input').text = ''
      $('.overlay, #order').fadeIn('slow')
    })
  })

  function validateForm(form) {
    $(form).validate({
      rules: {
        name: 'required',
        phone: 'required',
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: 'Пожалуйста, введите свое имя',
          minlength: jQuery.validator.format('Введите 2 символа!'),
        },
        phone: 'Пожалуйста, введите свой номер телефона',
        email: {
          required: 'Пожалуйста, введите свою почту',
          email: 'Неправильно введен адрес почты',
        },
      },
    })
  }

  validateForm('#consultation form')
  validateForm('#order form')
  validateForm('#consultation-form')

  $('input[name=phone]').mask('+7(999)999-99-99')

  $('form').on('submit', function (e) {
    e.preventDefault()
    if (!$(this).valid()) {
      return
    }
    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize(),
    }).done(function () {
      $(this).find('input').val('')
      $('#consultation, #order').fadeOut()
      $('.overlay, #thanks').fadeIn('slow')

      $('form').trigger('reset')
    })
    return false
  })

  // smooth scroll and pageup

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn()
    } else {
      $('.pageup').fadeOut()
    }
  })

  $('a[href=#up]').on('click', function () {
    const _href = $(this).attr('href')
    $('html, body').animate({ scrollTop: $(_href).offset().top + 'px' })
    return false
  })
  new WOW().init()
})
