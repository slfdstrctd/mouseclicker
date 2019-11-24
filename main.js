// Params
let img_count
let del_count = 0
let mice_max_width = 120
const mice_max = 104
let count = document.getElementById('count')

document.ready = init(null)

document.getElementById("button").onclick = init

function init() {
	del_count = 0
	img_count = document.getElementById("input").value || 10 + getRandomInt(30)
	count.innerText = del_count + "/" + img_count

	let i = 1
	let main = document.getElementById('main')
	let mice = document.getElementById('mice')
	let loading = document.getElementById('loading')

	while (mice.firstChild) {
		mice.removeChild(mice.firstChild)
	}

	while (i <= img_count) {
		let mice_w = 40 + getRandomInt(mice_max_width)
		let img = new Image()

		img.src = `./img/${normalize(i % mice_max + 1)}.png`
		img.style.position = "absolute"
		let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		img.style.left = `${getRandomInt(width * 0.7)}px`
		img.style.top = `${getRandomInt(height * 0.6)}px`
		img.onload = async function () {
			let k = this.height / (this.width / mice_w)
			this.width = mice_w
			this.height = k
			this.onclick = removeMice
		}
		i++
		mice.appendChild(img)
	}

	main.style.display = "block"
	loading.style.display = "none"
}

function removeMice(props) {
	if (!props.target.classList.contains('fade')) {
		del_count++
		count.innerText = del_count + "/" + img_count
	}
	props.target.classList.add('fade')
	setTimeout(function () {
		props.target.remove()
	}, 500)

}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max))
}

function normalize(t) {
	if (t < 10) return "00" + t
	else if (t < 100) return "0" + t
	else return t
}
