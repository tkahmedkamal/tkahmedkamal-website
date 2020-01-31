/* Import Packages And Files
==================================================*/
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "normalize.css/normalize.css";
import "../sass/styles.scss";
import WOW from "wow.js/dist/wow.min.js";
import "wow.js/css/libs/animate.css";
var wow = new WOW({
	boxClass: "reveal-animate"
});
wow.init();

$(function() {
	"use strict";

	/* Menu Area - FadeIn And FadeOut
	===================================================== */
	$("#menu-icon").on("click", function() {
		$("#menu-area")
			.fadeIn(400, function() {
				$("#navbar-area").addClass("active");
			})
			.css("display", "flex");
	});

	$("#close-primary-menu").on("click", function() {
		$("#navbar-area").removeClass("active");
		$("#menu-area")
			.delay(900)
			.fadeOut(400);
	});
	/* Menu Area End */
});
