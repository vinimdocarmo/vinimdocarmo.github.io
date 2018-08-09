(function() {
	"use strict";

	$.easing.easeInOutQuint = function(x, t, b, c, d) {
		if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
		return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
	};

	// smooth scroll
	$("a[href*=#]:not([href=#])").click(function() {
		if (
			location.pathname.replace(/^\//, "") ==
				this.pathname.replace(/^\//, "") &&
			location.hostname == this.hostname
		) {
			var target = $(this.hash);
			target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
			if (target.length) {
				$("html, body").animate(
					{
						scrollTop: target.offset().top
					},
					1000,
					"easeInOutQuint"
				);
				return false;
			}
		}
	});

	$(".email").attr(
		"href",
		"mailto:" + "vinicius.m.do.carmo" + "@" + "gmail" + "." + "com"
	);

	$(".profile a").on("mouseover mouseout", function(e) {
		$(this).toggleClass("animated tada", e.type === "mouseover");
	});

	setTimeout(function() {
		$(".credit").addClass("activate");
	}, 1000);

	Pts.quickStart("#particles", 'transparent');

	var world;

	space.add({
		start: (bound, space) => {
			// Create world and 100 random points
			world = new World(space.innerBound, 1, 0);
			let pts = Create.distributeRandom(space.innerBound, 40);

			// Create particles and hit them with a random impulse
			for (let i = 0, len = pts.length; i < len; i++) {
				let p = new Particle(pts[i]).size(
					i === 0 ? 30 : 3 + (Math.random() * space.size.x) / 50
				);
				p.hit(Num.randomRange(-50, 50), Num.randomRange(-25, 25));
				world.add(p);
			}

			world.particle(0).lock = true; // lock it to move it by pointer later on
		},

		animate: (time, ftime) => {
			world.drawParticles((p, i) => {
				let color =
					i === 0
						? "#fff"
						: ["#ff2d5d", "#42dc8e", "#2e43eb", "#ffe359"][i % 4];
				form.fillOnly(color).point(p, p.radius, "circle");
			});

			world.update(ftime);
		},

		action: (type, px, py) => {
			if (type == "move") {
				world.particle(0).position = new Pt(px, py);
			}
		}
	});

	space.bindMouse().bindTouch();
	space.play();
})();
