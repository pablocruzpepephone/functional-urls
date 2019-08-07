const test = require("tape")
const {urls: urlsF} = require("./index")
const {urls} = require("./original")

test("Length", assert => {
	const msg = "should have the same number of items"
    
	assert.same(urls.length, urlsF.length, msg)
	assert.end()
})
test("Structure", assert => {
	const msg = "should have the same item structure"
    
	const actual1 = Object.keys(urls[0])
	const actual2 = Object.keys(urlsF[0])
	const expected = ["urlArray","type"]
	assert.same(actual1, expected, msg)
	assert.same(actual2, expected, msg)
	assert.same(actual1, actual2, msg)
	assert.end()
})

test("Items", assert => {
	for (let i = 0; i < urls.length; i++) {
		assert.same(urls[i].type, urls[i].type, "Types should be the same")
		assert.same(urls[i].urlArray.length, urlsF[i].urlArray.length, "Length should be the same")
		for (let j = 0; j < urls[i].urlArray; j++) {
			assert.same(urls[i].urlArray[j], urlsF[i].urlArray[j], "Contents should be the same")
		}
	}
	assert.end()
})