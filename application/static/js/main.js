var app = {
	init: function() {
		app.smooth.init();
		app.softInit();
	},
	softInit: function() {
		if ($(".archiveitem").length) {
			app.aItem.init();
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
					duration: 500,
					render: function($container) {
						$container.addClass('is-exiting');
						app.smooth.content.restartCSSAnimations();
						app.smooth.body.animate({
							scrollTop: 0
						});
					}
				},
				onReady: {
					duration: 500,
					render: function($container, $newContent) {
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
	}
}
app.init();