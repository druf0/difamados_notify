const defaults = {
  background: 'rgba(255, 255, 255, 1.0)',
  titleColor: 'rgba(0, 0, 0, 1.0)',
  italicTitle: false,
  boldTitle: false,
  messageColor: 'rgba(0, 0, 0, 1.0)',
  borderRadius: '3px',
  border: 'none',
  icon: undefined,
  startImage: undefined,
  audio: undefined,
  duration: 5000,
}

window.addEventListener('message', function (event) {
  var data = event.data
  if (data.action === 'notify') {
    Notify(
      data.data.title,
      data.data.text,
      data.data.type,
      data.data.duration
    )
  } else if (data.action === 'settings') {
    $('.container').css('display', 'none')
    $('.settings-container').css('display', 'flex')
  } else if (data.action === 'closeSettings') {
    $('.container').css('display', 'flex')
    $('.settings-container').css('display', 'none')
  }
})

function createNotification(title, message, options, pDuration) {
  //Creating and getting nodes
  let rootElement = document.getElementById('notifications')
  let notifElement = CreateMyElement('div', 'notification')
  let notifBodyElement = CreateMyElement('div', 'notif-body')
  let titleElement = CreateMyElement(
    'div',
    'notif-title',
    options && options.icon ? `${options.icon}${title}` : title
  )
  let messageElement = CreateMyElement('div', 'notif-message', message)

  //Adding the elements to the notification
  notifBodyElement.append(titleElement)
  notifBodyElement.append(messageElement)
  notifElement.append(notifBodyElement)

  //Checking if there's an image, if so, we add it to the element
  if (options && options.startImage) {
    let notifImageContainer = CreateMyElement('div', 'notif-image')
    let notifImageElement = CreateMyElement('img')
    notifImageElement.src = options.startImage

    notifImageContainer.append(notifImageElement)

    notifElement.insertBefore(notifImageContainer, notifElement.firstChild)
  }

  //Styling elements
  options && options.background
    ? (notifElement.style.background = options.background)
    : (notifElement.style.background = defaults.background)

  options && options.border
    ? (notifElement.style.border = options.border)
    : (notifElement.style.border = defaults.border)

  options && options.borderRadius
    ? (notifElement.style.borderRadius = options.borderRadius)
    : (notifElement.style.borderRadius = defaults.borderRadius)

  options && options.titleColor
    ? (titleElement.style.color = options.titleColor)
    : (titleElement.style.color = defaults.titleColor)

  options && options.titleColor
    ? (titleElement.style.color = options.titleColor)
    : (titleElement.style.color = defaults.titleColor)

  options && options.messageColor
    ? (messageElement.style.color = options.messageColor)
    : (messageElement.style.color = defaults.messageColor)

  options && options.boldTitle && (titleElement.style.fontWeight = 'bold')

  options && options.italicTitle && (titleElement.style.fontStyle = 'italic')

  //Calculating left to right and vica versa
  let calculatedMargin

  if (userSettings.fromRightToLeft) {
    calculatedMargin = 420 + window.innerWidth - userSettings.left
  } else {
    calculatedMargin = -(420 + 30 + userSettings.left)
  }
  notifElement.style.marginLeft = calculatedMargin + 'px'

  //Creating audio, if enabled
  let notifyAudio
  if (userSettings.audio) {
    options && options.audio
      ? (notifyAudio = new Audio(options.audio))
      : (notifyAudio = new Audio('assets/notify.ogg'))
  }

  setTimeout(function () {
    notifElement.style.marginLeft = '0px'
    notifyAudio && notifyAudio.play()
  }, 50)
  rootElement.insertBefore(notifElement, rootElement.firstChild)

  // Hiding notification
  let duration = pDuration
    ? pDuration
    : (options && options.duration) ?? defaults.duration

  setTimeout(function () {
    notifElement.style.marginLeft = calculatedMargin + 'px'
    notifyAudio = undefined
  }, duration)

  setTimeout(function () {
    notifElement.remove()
  }, duration + 100)
}

function CreateMyElement(element, className, innerHtml) {
  let myElement = document.createElement(element)
  className && myElement.classList.add(className)
  innerHtml && (myElement.innerHTML = innerHtml)
  return myElement
}

function Notify(title, text, type, duration) {
  createNotification(title, text, notify[type], duration)
}