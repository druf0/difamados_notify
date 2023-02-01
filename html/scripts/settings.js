const defaultSettings = {
  top: 0,
  left: 0,
  fromRightToLeft: true,
  audio: true,
}

var userSettings

$(() => {
  initSettings()
  initClickHandlers()

  var selected = null,
    xPos = 0,
    yPos = 0,
    xElem = 0,
    yElem = 0

  function drag(elem) {
    selected = elem
    xElem = xPos - $(selected).offset().left
    yElem = yPos - $(selected).offset().top
  }

  function moveElement(e) {
    xPos = e.pageX
    yPos = e.pageY
    if (selected !== null) {
      let top = yPos - yElem
      let left = xPos - xElem
      left > 0 &&
        left < window.innerWidth - $(selected).outerWidth() &&
        (selected.style.left = left + 'px')
      top > 0 &&
        top < window.innerHeight - $(selected).outerHeight() &&
        (selected.style.top = top + 'px')
      setHorizontalButton()
    }
  }

  function destroyDrag() {
    selected = null
  }

  $('#notificationSettings').on('mousedown', function () {
    drag(this)
  })

  document.onmousemove = moveElement
  document.onmouseup = destroyDrag
})

function initSettings() {
  userSettings = JSON.parse(localStorage.getItem('NotifySettings'))

  if (userSettings == null) {
    localStorage.setItem('NotifySettings', JSON.stringify(defaultSettings))
    userSettings = defaultSettings
  }

  $('.notif-settings-container').css({
    top: userSettings.top,
    left: userSettings.left,
  })

  setAudioButton()
  setFromLeftToRightButton()
  setHorizontalButton()
  setNotificationPosition()
}

function initClickHandlers() {
  $('#horizontalButton').on('click', function () {
    userSettings.fromRightToLeft = !userSettings.fromRightToLeft
    setFromLeftToRightButton()
  })

  $('#audioButton').on('click', function () {
    userSettings.audio = !userSettings.audio
    setAudioButton()
  })

  $('#saveSettings').on('click', function () {
    userSettings.top = parseInt(
      $('#notificationSettings').css('top').replace('px', '')
    )
    userSettings.left = parseInt(
      $('#notificationSettings').css('left').replace('px', '')
    )

    saveSettings(userSettings)
    setNotificationPosition()
  })
}

function saveSettings(settings) {
  localStorage.setItem('NotifySettings', JSON.stringify(settings))
  $.post(
    'http://difamados_notify/action',
    JSON.stringify({
      action: 'close',
    })
  )
}

function setHorizontalButton() {
  if (
    parseInt($('.notif-settings-container').css('left').replace('px', '')) <
    window.innerWidth / 2
  ) {
    $('.settings-horizontal').css('right', '-50px')
    $('.settings-horizontal').css('left', '')
  } else {
    $('.settings-horizontal').css('right', '')
    $('.settings-horizontal').css('left', '-50px')
  }
}

function setAudioButton() {
  userSettings.audio
    ? $('#audioButton').html('<i class="fa-solid fa-volume-high"></i>')
    : $('#audioButton').html('<i class="fa-solid fa-volume-xmark"></i>')
}

function setFromLeftToRightButton() {
  if (userSettings.fromRightToLeft) {
    $('.settings-horizontal').css('transform', 'rotate(0deg)')

    $('.dummyNotification.n2').css('margin-left', '20px')
    $('.dummyNotification.n2').css('margin-right', '0')

    $('.dummyNotification.n3').css('margin-left', '40px')
    $('.dummyNotification.n3').css('margin-right', '0')
  } else {
    $('.settings-horizontal').css('transform', 'rotate(180deg)')
    $('.dummyNotification.n2').css('margin-right', '20px')
    $('.dummyNotification.n2').css('margin-left', '0')

    $('.dummyNotification.n3').css('margin-right', '40px')
    $('.dummyNotification.n3').css('margin-left', '0')
  }
}

function setNotificationPosition() {
  $('.notif-container').css('top', userSettings.top + 'px')
  $('.notif-container').css('left', userSettings.left + 'px')
}
