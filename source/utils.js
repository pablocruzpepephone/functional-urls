const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x)
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)
const trace = label => x => {
	console.log(label)
	console.log(x)
	return x
}

const curry = (f, arr = []) => (...args) =>
	(a => (a.length === f.length ? f(...a) : curry(f, a)))([...arr, ...args])

const view = (lens, store) => lens.view(store)
const set = (lens, value, store) => lens.set(value, store)

const lens = prop => ({
	view: store => store[prop],
	set: (value, store) => ({
		...store,
		[prop]: value
	})
})

const transduce = (xform, reducing, initial, input) =>
	input.reduce(xform(reducing), initial)

const assertEquals = (a, b) => {
	return (
		a.length === b.length && a.reduce((acc, e, i) => acc && e === b[i], true)
	)
}

module.exports = {
	compose,
	pipe,
	trace,
	curry,
	lens,
	view,
	set,
	assertEquals,
	transduce
}
