const fs = require('fs')
const sfsCrollabledPath =
	'node_modules/@storefront-ui/shared/styles/components/molecules/SfScrollable.scss'
const dangerImport = '@import "~simplebar/dist/simplebar.min";'
try {
	if (!fs.existsSync(sfsCrollabledPath)) {
		console.log(`cant find ${sfsCrollabledPath}`)
		return
	}
} catch (err) {
	console.error(err)
	return
}
const script = fs.readFileSync(sfsCrollabledPath).toString()
if (script.indexOf(dangerImport) === -1) {
	return
}
fs.writeFileSync(sfsCrollabledPath, script.replace(dangerImport, ''))
