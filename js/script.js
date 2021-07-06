//===============БУРГЕР================
let burger = document.querySelector('.menu-burger__burger');
let menuBurger = document.querySelector('.header__menu');

burger.addEventListener("click", function (e) {
	burger.classList.toggle('active');
	menuBurger.classList.toggle('active');
})

//=================СЛАЙДЕР========================
document.addEventListener('DOMContentLoaded', function () {

	const slide = document.querySelectorAll('.slide');
	const sliderLine = document.querySelector('.slider__line');
	let count = 0;
	let width;

	let plus = document.querySelector('.slider__min');

	function init() {
		console.log('resize');
		width = document.querySelector('.slider__sliders').offsetWidth;
		sliderLine.style.width = width * slide.length + "px";
		slide.forEach(i => {
			i.style.width = width + "px";
			i.style.height = 'auto';
		})
	}
	rollSlider()
	window.addEventListener('resize', init);
	init();

	document.querySelector('.slider__next').addEventListener('click', function () {
		count++;
		plus.innerHTML++;
		if (count >= slide.length) {
			count = 0;
			plus.innerHTML = 1;
		}
		rollSlider();
	})

	document.querySelector('.slider__prev').addEventListener('click', function () {
		count--;
		plus.innerHTML--;
		if (count < 0) {
			count = slide.length - 1;
			plus.innerHTML = 1;
		}
		if (count > 0) {
			plus.innerHTML++
		}
		rollSlider();
	})

	function rollSlider() {
		sliderLine.style.transform = 'translate(-' + count * width + 'px) ';
		window.addEventListener('resize', init);
		init();
	}

});

//====================FORMS===========================
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);


		let formData = new FormData(form);
		// formData.append();

		if (error === 0) {

			form.classList.add('_sending');
			// let response = await fetch('sendmail.php', {
			// 	method: 'POST',
			// 	body: formData
			// });
			// if (response.ok) {
			// 	let response = await response.json();
			// 	alert(result.message);
			// 	form.reset();
			// 	form.classList.remove('_sending');
			// } else {
			// 	alert('ошибка отправки формы')
			// 	form.classList.remove('_sending');
			// }

		}


	}

	//-----------------------------------валидация регистрации----------------------------------//
	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');


		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);


			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;

				}


			} else if (input.classList.contains('_phone')) {
				if (phoneTest(input)) {
					formAddError(input);
					error++
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
});
function emailTest(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
function phoneTest(input) {
	return !/^(?:\(\d{3}\)|\d{3})(?: *- *)?\d{3}(?: *- *)?\d{4}$/.test(input.value);
}

//-----------------------------------АНИМАЦИЯ----------------------------------//

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll)
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_stop-anim')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrolltop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrolltop, left: rect.left + scrollLeft }
	}
	setTimeout(() => {
		animOnScroll();
	}, 500)

};

//=============ScrollWiev=========================

let ScrollWiev = document.querySelector('.header__scroll');

ScrollWiev.addEventListener('click', function () {
	setScrollWiev();
	burger.classList.remove('active');
	menuBurger.classList.remove('active');
});

function setScrollWiev(top) {
	const lessoSelected = document.querySelector('.project__title');
	lessoSelected.scrollIntoView({

		behavior: "smooth"
	});
}