const fs = require("fs")
const rates = JSON.parse(fs.readFileSync("./source/data/data.json"))

const urls = rates.reduce((acc, rate) => {
	if (Object.prototype.hasOwnProperty.call(rate,"offers")) {
		const offerUrls = rate.offers.map(
			offer => offer.urlName
		).filter(url => !!url)
		const bundleUrls = rate.offers.map(
			offer => Object.prototype.hasOwnProperty.call(offer,"bundles") &&
        offer.bundles.map(bundle => bundle.urlName)
		).filter(url => !!url).join().split(",")

		return acc.concat({
			urlArray: [...offerUrls, ...bundleUrls],
			type: "bundle",
		})
	} else if (Object.prototype.hasOwnProperty.call(rate,"purchases")) {
		const purchaseUrls = rate.purchases.map(
			purchase => purchase.urlName
		)
		const channelUrls = rate.purchases.map(purchase => {
			if (Object.prototype.hasOwnProperty.call(purchase,"channels")) {
				return Object.values(purchase.channels).reduce(
					(acc, e) => e.urlName,
					[]
				)
			}
		}).filter(url => !!url)

		return acc.concat({
			urlArray: [...purchaseUrls, ...channelUrls],
			type: "purchase",
		})
	}
	return acc
}, [])

module.exports = {
	urls
}