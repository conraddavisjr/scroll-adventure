// toggle scrolling on the body
var bodyTag = document.querySelector('body');
var toggleScroll = (delay) => {
	bodyTag.classList.add('disabledScroll');
	setTimeout(() => {
		bodyTag.classList.remove('disabledScroll');
	}, `${delay * 1000}`)
}

export default toggleScroll;