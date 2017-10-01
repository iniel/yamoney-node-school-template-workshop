'use strict';

const http = require('http');
const user = require('./user');
const products = require('./products');

function getShowcase(user, products) {
	return products.map((product) => {
		const showcaseItem = {
			name: product.name
		};

		if (product.sale) {
			showcaseItem.price = product.price * (100 - product.sale) / 100;
		} else {
			showcaseItem.price = product.price;
		}

		return showcaseItem;
	});
}

function getBonuses(user, showcase) {
	const random = Math.floor(Math.random() * showcase.length);
	const randomProduct = showcase[random];

	return [randomProduct];
}

http.createServer((req,res) => {
	const showcase = getShowcase(user, products);
	const bonuses = getBonuses(user, showcase);

	const pageData = {showcase, bonuses};

	res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	res.end(`<!DOCTYPE html>
		<html>
		<head>
			<title>Витрина</title>
		</head>
		<body>
			<h1>Витрина</h1>
			<ul>
				<li><strong>Товар 1</strong> - 100 &#8381;</li>
			</ul>
			<span>После покупки вам будет доступен бонус.</span>
			<p>Витрина доступна только для зарегистрированных пользователей.</p>
		</body>
		</html>`);
}).listen(3000, () => {
	console.log('Ready on http://localhost:3000');
});
