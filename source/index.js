const fs = require("fs")
const rates = JSON.parse(fs.readFileSync("./source/data/data.json"))

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)
const curry = (f, arr = []) => (...args) =>
	(a => (a.length === f.length ? f(...a) : curry(f, a)))([...arr, ...args])
  
const view = (lens, store) => lens.view(store)

const lens = prop => ({
	view: store => store[prop],
	set: (value, store) => ({
		...store,
		[prop]: value
	})
})

const cFilter = curry((Fn, arr) => arr.filter(Fn))
const filterHas = prop => e => Object.prototype.hasOwnProperty.call(e,prop)
const getProp = prop => e =>
	e.reduce((acc, el) => acc.concat(curry(view)(lens(prop))(el)), [])
const getObjectValues = e =>
	e.reduce((acc, el) => acc.concat(Object.values(el)), [])


const getOffers = rate =>
	[rate].reduce(
		(acc, rate) =>
			acc.concat(
				pipe(
					cFilter(filterHas("urlName")),
					getProp("urlName")
				)(rate.offers),
				pipe(
					cFilter(filterHas("bundles")),
					getProp("bundles"),
					cFilter(filterHas("urlName")),
					getProp("urlName")
				)(rate.offers)
			),
		[]
	)

const getPurchases = rate =>
	[rate].reduce(
		(acc, rate) =>
			acc.concat(
				getProp("urlName")(rate.purchases),
				pipe(
					cFilter(filterHas("channels")),
					getProp("channels"),
					getObjectValues,
					getProp("urlName")
				)(rate.purchases)
			),
		[]
	)

const urls = rates.reduce((acc, rate) => {
	return acc.concat(
		Object.prototype.hasOwnProperty.call(rate,"offers")
			? { urlArray: getOffers(rate), type: "bundle" }
			: Object.prototype.hasOwnProperty.call(rate,"purchases")
				? { urlArray: getPurchases(rate), type: "purchase" }
				: []
	)
}, [])

module.exports = {
	urls
}
