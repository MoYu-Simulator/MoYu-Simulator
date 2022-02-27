webpackHotUpdate("main",{

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst game_1 = __webpack_require__(/*! ./game */ \"./src/game.ts\");\nconst video_1 = __webpack_require__(/*! ./video */ \"./src/video.ts\");\nconst score_1 = __webpack_require__(/*! ./score */ \"./src/score.ts\");\nconst button = document.createElement(\"button\");\nbutton.innerHTML = \"Play\";\nbutton.style.cssText = `\n    position: fixed;\n    top: 45%;\n    left: 45%;\n    width: 10%;\n    height: 10%;\n    z-index: 3;\n`;\nbutton.addEventListener('click', () => {\n    video_1.videoPlayer.play();\n    game_1.app.ticker.start();\n    document.body.appendChild(score_1.scorePanel);\n    button.style.visibility = \"hidden\";\n});\ndocument.body.appendChild(button);\n//setTimeout(()=>{\n//    gg();\n//    app.ticker.stop();\n//},10*1000)\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMuanMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9qaW5namlleWFuZy9XZWJzdG9ybVByb2plY3RzL01vWXUtU2ltdWxhdG9yL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcHAgfSBmcm9tICcuL2dhbWUnO1xuaW1wb3J0IHsgdmlkZW9QbGF5ZXIgfSBmcm9tICcuL3ZpZGVvJ1xuaW1wb3J0IHsgc2NvcmVQYW5lbCB9IGZyb20gJy4vc2NvcmUnO1xuaW1wb3J0IHsgZ2cgfSBmcm9tICcuL2dnJztcblxuY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbmJ1dHRvbi5pbm5lckhUTUwgPSBcIlBsYXlcIjtcbmJ1dHRvbi5zdHlsZS5jc3NUZXh0ID0gYFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDQ1JTtcbiAgICBsZWZ0OiA0NSU7XG4gICAgd2lkdGg6IDEwJTtcbiAgICBoZWlnaHQ6IDEwJTtcbiAgICB6LWluZGV4OiAzO1xuYDtcbmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICB2aWRlb1BsYXllci5wbGF5KCk7XG4gICAgYXBwLnRpY2tlci5zdGFydCgpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NvcmVQYW5lbCk7XG4gICAgYnV0dG9uLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xufSk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGJ1dHRvbik7XG5cbi8vc2V0VGltZW91dCgoKT0+e1xuLy8gICAgZ2coKTtcbi8vICAgIGFwcC50aWNrZXIuc3RvcCgpO1xuLy99LDEwKjEwMDApIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTs7Ozs7OztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.ts\n");

/***/ })

})