var prod = document.getElementById('prod');
var uat = document.getElementById('uat');
prod.addEventListener('click', generateString);
uat.addEventListener('click', generateString);

var now = new Date();
now.setSeconds(0, 0);
var nowString = now.toISOString().replace(':00.000Z', '');

var date = document.getElementById('date');
date.value = nowString;
date.setAttribute('min', nowString);
date.addEventListener('keyup', generateString);

var generated = document.getElementById('generated');
generateString();

var copy = document.getElementById('copy');
copy.addEventListener('click', () => {
  navigator.clipboard.writeText(generated.value);
  if (!copy.classList.contains('green')) {
    copy.classList.add('green');
    setTimeout(() => {
      copy.classList.remove('green');
    }, 1000);
  }
});

function generateString() {
  let string = '';
  if (prod.checked && uat.checked) {
    string += 'PROD/UAT ';
  } else if (prod.checked) {
    string += 'PROD ';
  } else if (uat.checked) {
    string += 'UAT ';
  } else {
    string += 'Version ';
  }
  string += date.value.slice(2);

  let edited = new Date(date.value + ':00.000Z');
  if (edited.getTime() > now.getTime()) {
    string += ' (S)';
  }
  generated.value = string;
}