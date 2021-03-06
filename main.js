import 'emoji-picker-element';

const form = document.querySelector('form')
const emojiBtn = document.querySelector('#emoji-btn')
const emojiPicker = document.querySelector('emoji-picker')
const textarea = document.querySelector('#message')
const name = document.querySelector('#name')
const email = document.querySelector('#email')
const errorElement = document.querySelector('#error')

// Hover Btn

const emojis = [ 
  "😆",  "😅",  "🤣",  "😂",  "😀",  "🤑",  "🤨",  "🙂",
  "😊",  "😗",  "😛",  "😏",  "🤥",  "😴",  "🥺", "😧",
  "🤗",  "🤩",  "😎",  "🥳",  "😍",  "😱",  "🤓", "😷",
  "🥴",  "😳",  "🤯",  "🤫",  "🤑",  "😪",  "😴", "😵"
];

emojiBtn.addEventListener('mouseover', () => {
  emojiBtn.innerText = emojis[Math.floor(Math.random() * emojis.length)]
})

// Emoji Picker

emojiBtn.addEventListener('click', function(e) {
  e.preventDefault()
  emojiPicker.classList.remove('hidden')
})

document.addEventListener('mouseup', function(e) {
  if (!form.contains(e.target)) {
    emojiPicker.classList.add('hidden')
  }
})

emojiPicker.addEventListener('emoji-click', (event) => {
  //console.log(event.detail)
  insertAtCursor(textarea, event.detail.unicode)
});


function insertAtCursor(myField, myValue) {
  if (document.selection) {
      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
  } else if (myField.selectionStart || myField.selectionStart == '0') {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      myField.value = myField.value.substring(0, startPos)
          + myValue
          + myField.value.substring(endPos, myField.value.length);
  } else {
      myField.value += myValue;
  }

  emojiPicker.classList.add('hidden')
}

// Validation

form.addEventListener('submit', (e) => {
  let messages = []

  function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  if (name.value === '' || name.value == null) {
    messages.push('Name is required')
    name.classList.add('ring-1')
    name.classList.add('ring-red-500')
    name.classList.add('border-red-500')
  } else {
    name.classList.remove('ring-1')
    name.classList.remove('ring-red-500')
    name.classList.remove('border-red-500')
  }

  if (emailIsValid(email.value) === false) {
    messages.push('Email is required')
    email.classList.add('ring-1')
    email.classList.add('ring-red-500')
    email.classList.add('border-red-500')
  } else {
    email.classList.remove('ring-1')
    email.classList.remove('ring-red-500')
    email.classList.remove('border-red-500')
  }
  
  if (message.value === '' || message.value == null) {
    messages.push('Message is required')
    message.classList.add('ring-1')
    message.classList.add('ring-red-500')
    message.classList.add('border-red-500')
  } else {
    message.classList.remove('ring-1')
    message.classList.remove('ring-red-500')
    message.classList.remove('border-red-500')
  }

  if (messages.length > 0) {
    e.preventDefault()
    errorElement.classList.remove('hidden')
    errorElement.innerText = messages.join(', ')
  }
})