var player;
var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var spaceBarPressed = false;
var playerDirection = "down";
var playerArrows;
var arrowSpeed = 5;

function setPlayerDirection(dir) {
  //Display the walk animation for the correct direction, remove the other directions
  //to ensure the player does not have both "left" and "right" applied at the same time
  player.classList.remove("up");
  player.classList.remove("left");
  player.classList.remove("right");
  player.classList.remove("down");

  player.classList.add(dir);
  playerDirection = dir;
}

function keyUp(event) {
  switch (event.keyCode) {
    case 32:
      spaceBarPressed = false;
      break;
    case 37:
      leftPressed = false;
      break;
    case 38:
      upPressed = false;
      break;
    case 39:
      rightPressed = false;
      break;
    case 40:
      downPressed = false;
      break;
  }
}

function move() {
  var left = player.offsetLeft;
  var top = player.offsetTop;

  if (downPressed) {
    setPlayerDirection("down");
    top = top + 1;
  }

  if (upPressed) {
    setPlayerDirection("up");
    top = top - 1;
  }

  if (leftPressed) {
    setPlayerDirection("left");
    left = left - 1;
  }

  if (rightPressed) {
    setPlayerDirection("right");
    left = left + 1;
  }

  //Get the the element at the coordinates for where the play will move to
  //All 4 corners of the player are required to check there is no collision on any side
  var playerTopLeft = document.elementFromPoint(left, top);
  var playerTopRight = document.elementFromPoint(left + 32, top);
  var playerBottomLeft = document.elementFromPoint(left, top + 48);
  var playerBottomRight = document.elementFromPoint(left + 32, top + 48);

  //If the element that the player is about to walk over contains the class "blocking" then
  // the player is not moved.
  // The player will only be moved to coordinates `top` and `left` if the element in that position is not blocking
  if (
    !playerTopLeft.classList.contains("blocking") &&
    !playerTopRight.classList.contains("blocking") &&
    !playerBottomLeft.classList.contains("blocking") &&
    !playerBottomRight.classList.contains("blocking")
  ) {
    player.style.left = left + "px";
    player.style.top = top + "px";
  }

  //If any of the keys are being pressed, display the walk animation
  if (leftPressed || rightPressed || upPressed || downPressed) {
    player.classList.add("walk");
    player.classList.remove("stand");
  } else if (spaceBarPressed) {
    spaceBarPressed = false;
    player.classList.add("fire");
    var arrow = createArrow(playerDirection, left, top);
    playerArrows.appendChild(arrow);
  }
  //Otherwise, no keys are being pressed, display stand
  else {
    player.classList.add("stand");
    player.classList.remove("walk");
    player.classList.remove("fire");
  }

  moveArrows();
}

function moveArrows() {
  var arrows = playerArrows.childNodes;
  for (var i = 0; i < arrows.length; i++) {
    moveArrow(arrows[i]);
  }
}

function moveArrow(arrow) {
  var left = arrow.offsetLeft;
  var top = arrow.offsetTop;

  if (arrow.classList.contains("down")) {
    top = top + arrowSpeed;
  } else if (arrow.classList.contains("up")) {
    top = top - arrowSpeed;
  } else if (arrow.classList.contains("left")) {
    left = left - arrowSpeed;
  } else if (arrow.classList.contains("right")) {
    left = left + arrowSpeed;
  }

  //Get the the element at the coordinates for where the play will move to
  //All 4 corners of the arrow are required to check there is no collision on any side
  var arrowTopLeft = document.elementFromPoint(left, top);
  var arrowTopRight = document.elementFromPoint(left + 32, top);
  var arrowBottomLeft = document.elementFromPoint(left, top + 48);
  var arrowBottomRight = document.elementFromPoint(left + 32, top + 48);

  //went out of map
  if (
    !arrowTopLeft ||
    !arrowTopRight ||
    !arrowBottomLeft ||
    !arrowBottomRight
  ) {
    playerArrows.removeChild(arrow);
    return;
  }

  //If the element that the arrow is about to walk over contains the class "blocking" then
  // the arrow is not moved.
  // The arrow will only be moved to coordinates `top` and `left` if the element in that position is not blocking
  if (
    !arrowTopLeft.classList.contains("blocking") &&
    !arrowTopRight.classList.contains("blocking") &&
    !arrowBottomLeft.classList.contains("blocking") &&
    !arrowBottomRight.classList.contains("blocking")
  ) {
    arrow.style.left = left + "px";
    arrow.style.top = top + "px";
  }
}

function createArrow(dir, left, top) {
  var arrow = document.createElement("div");
  arrow.classList.add("arrow");
  arrow.classList.add(dir);
  switch (dir) {
    case "left":
      left -= 32;
      top += 16;
      break;
    case "right":
      left += 32;
      top += 16;
      break;
    case "up":
      top -= 16;
      break;
    case "down":
      top += 48;
      break;
  }
  arrow.style.left = left + "px";
  arrow.style.top = top + "px";
  return arrow;
}

function keyDown(event) {
  switch (event.keyCode) {
    case 32:
      spaceBarPressed = true;
      break;
    case 37:
      leftPressed = true;
      break;
    case 38:
      upPressed = true;
      break;
    case 39:
      rightPressed = true;
      break;
    case 40:
      downPressed = true;
      break;
  }
}

function gameStart() {
  player = document.getElementById("player");
  playerArrows = document.getElementById("playerArrows");
  setInterval(move, 10);
  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);
}

document.addEventListener("DOMContentLoaded", gameStart);
