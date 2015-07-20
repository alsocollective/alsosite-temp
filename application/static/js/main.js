var app = {
	init: function() {
		app.smooth.init();
		app.softInit();
		// app.analyticsInit();
	},
	softInit: function() {
		if ($(".archiveitem").length) {
			app.aItem.init();
		} else if ($(".archivelist").length) {
			app.mouseOverImage.init()
		} else if ($(".index").length) {
			console.log("index");
			app.indexCarosel();
		}
	},
	smooth: {
		init: function() {
			if (app.smooth.content == undefined) {
				app.smooth.setup();
			}
		},
		setup: function() {
			app.smooth.body = $('html, body'),
			app.smooth.content = $('#wrapper').smoothState({
				onStart: {
					duration: 2000,
					render: function($container) {
						$container.addClass('is-exiting');
						app.smooth.content.restartCSSAnimations();

					}
				},
				onReady: {
					duration: 2000,
					render: function($container, $newContent) {
						app.smooth.body.animate({
							scrollTop: 0
						}, 0);
						$container.removeClass('is-exiting');
						$container.html($newContent);
						app.smooth.content.restartCSSAnimations();
					}
				},
				onAfter: function(url, $container, $content) {
					app.softInit();
				},
				blacklist: '.no-smoothState'
			}).data('smoothState');
		}
	},
	aItem: {
		init: function() {
			$("#list a").click(app.aItem.modulClick);

			$(document).keyup(function(e) {
				if (e.keyCode == 27) {
					$(".overlay").each(app.aItem.remove)
				}
			});
		},
		modulClick: function(event) {
			event.preventDefault();
			app.aItem.createModul(this.href);
			return false;
		},
		createModul: function(link) {
			var modul = document.createElement("div");
			modul.className = "overlay";

			var div = document.createElement("div");

			var scaling = $(window).width() / 1.3 / 500;
			var iframe = document.createElement("iframe");
			iframe.src = link + "?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1";
			iframe.height = Math.floor(281 * scaling);
			iframe.width = Math.floor(500 * scaling);

			iframe.setAttribute("frameborder", "0");

			div.appendChild(iframe)
			modul.appendChild(div)

			$(".archiveitem")[0].appendChild(modul);
			$(modul).click(app.aItem.remove);
		},
		remove: function() {
			this.parentNode.removeChild(this);
		}
	},
	mouseOverImage: {
		target: null,
		init: function() {
			app.mouseOverImage.target = $(".relative .backgroundimage");
			$("tr").mouseover(app.mouseOverImage.Event);
		},
		Event: function(event) {
			app.mouseOverImage.createLoadingElement(this);
		},
		createLoadingElement: function(element) {
			var newImage = $(element).data("img")
			if (newImage && newImage.indexOf("None") < 0) {
				newImg = $(document.createElement("img"));
				newImg.addClass("offscreen");
				newImg.attr("src", newImage);
				app.mouseOverImage.loading = newImg;
				document.body.appendChild(newImg[0]);
				newImg.error(app.mouseOverImage.remove);
				newImg.bind('load', app.mouseOverImage.setImage);
			}
		},
		setImage: function() {
			if (!$(app.mouseOverImage.target[1]).hasClass("nonactive")) {
				$(app.mouseOverImage.target[0]).css("background-image", "url(" + app.mouseOverImage.loading[0].src + ")");
				$(app.mouseOverImage.target[1]).addClass("nonactive");
			} else {
				$(app.mouseOverImage.target[1]).css("background-image", "url(" + app.mouseOverImage.loading[0].src + ")");
				$(app.mouseOverImage.target[1]).removeClass("nonactive");
			}
			$(".offscreen").remove();
			// document.body.removeChild(app.mouseOverImage.loading[0]);
		},
		remove: function() {
			this.parentNode.removeChild(this);
		}
	},
	indexCarosel: function() {
		$("#carosole").slick({
			autoplay: true,
			fade: true,
			autoplaySpeed: 8000,
			arrows: false
		});
	}
}
app.init();