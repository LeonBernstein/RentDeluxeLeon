/*! Copyright 2019 Leon Bernstein | Staff of Frost */

(function () {
	var browserVer = {
		chrome: {
			update: 69,
			outdated: 64,
		},
		firefox: {
			update: 62,
			outdated: 58,
		},
		opera: {
			update: 56,
			outdated: 51,
		},
		edge: {
			outdated: 17,
		},
		safari: {
			outdated: 12,
		}
	};
	
	
	var id = (function() {
		var ua = navigator.userAgent, tem,
	
		M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	
		if(/trident/i.test(M[1])){
				tem =  /\brv[ :]+(\d+)/g.exec(ua) || [];
				return 'IE '+(tem[1] || '');
		}
	
		if(M[1]=== 'Chrome'){
			tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
			
			if(tem!= null) {
				return tem.slice(1).join(' ').replace('OPR', 'Opera');
			}
		}
	
		M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	
		if ((tem= ua.match(/version\/(\d+)/i))!= null) {
			M.splice(1, 1, tem[1])
		}
		return M.join(' ');
	})();
	
	id = id.split(' ')
	
	function DOM_loaded(func) {
		if (document.readyState === "complete" ||
			(document.readyState !== "loading" &&
			!document.documentElement.onscroll))
		{
			func();
			
		} else {
			window.addEventListener('DOMContentLoaded', func, { once: true });
		}
	}
	
	function outDated() {
		function setText() {
			var body = document.querySelector('body');
			body.innerHTML = '';
			body.style.backgroundColor = 'white';
			body.style.textAlign = 'center';
			var h1 = document.createElement('h1');
			if (id[0] == 'IE') {
				h1.innerText = 'Your browser is not supported!';
			} else {
				h1.innerText = 'Your browser is outdated!\nPlease update your browser.';
			}
			body.appendChild(h1);
		}
		DOM_loaded(setText);
	}
	
	function update(str) {
		function setMsg() {
			var body = document.querySelector('body');
			var div = document.createElement('div');
			if (str) {
				div.innerText = str;
			} else {
				div.innerText = 'Your browser is running on an old version, please update your browser so that the website could function properly.';
			}
			div.style.color = 'black';
			div.style.backgroundColor = 'orange';
			div.style.position = 'absolute';
			div.style.top = '0';
			div.style.textAlign = 'center';
			div.style.borderBottom = '1px solid black';
			div.style.width = '100%';
			div.style.paddingBottom = '5px';
			body.appendChild(div)
			setTimeout(function() {
				body.removeChild(div);
			}, 15000);
		}
		DOM_loaded(setMsg);
	}
	
	var browser = id[0].toLowerCase()
	var ver = +id[1]
	
	if (browser == 'chrome' &&
			ver < browserVer.chrome.update
	) {
		if (ver < browserVer.chrome.outdated) {
			outDated();
		} else {
			update();
		}
	} else if (browser == 'firefox' &&
						ver < browserVer.firefox.update
	) {
		if (ver < browserVer.firefox.outdated) {
			outDated()
		} else {
			update()
		}
	} else if (browser == 'opera' &&
						ver < browserVer.opera.update
	) {
		if (ver < browserVer.opera.outdated) {
			outDated()
		} else {
			update()
		}
	} else if (browser == 'safari' &&
						ver < browserVer.safari.outdated
	) {
		outDated()
		
	} else if (browser == 'edge') {
		if (ver < browserVer.edge.outdated) {
			outDated()
		} else {
			update('Your browser may not be able to run all features on this website, please use Chrome or Firefox for best support.')
		}
	} else if (browser == 'ie') {
		outDated()
	}
	
})();
