let score = 0;
let pointsPerClick = 1;
let upgrades = [];
let player = { score, pointsPerClick, upgrades }; // added player object

const clickableImage = document.getElementById('clickableImage');
const scoreElement = document.getElementById('score');
const upgradeButton = document.getElementById('upgradeButton');
const upgradeContainer = document.getElementById('upgrades');

function save() {
  try {
    localStorage.setItem('copperSave', JSON.stringify(player));
    console.log('Game saved successfully');
  } catch(err) {
    console.log('Cannot access localStorage - browser may be old or storage may be corrupt');
  }
}
function loadGame() {
  var gameLoad = JSON.parse(localStorage.getItem('copperSave'));
  if (gameLoad) {
    player = gameLoad;
    score = player.score;
    pointsPerClick = player.pointsPerClick;
    upgrades = player.upgrades;
    console.log('Game loaded successfully');
  } else {
    console.log('No saved game found');
  }
  // update score and points per click elements
  scoreElement.textContent = score;
  upgrades.forEach((upgrade, index) => {
    const upgradeElement = document.getElementById(`upgrade${index + 1}`);
    upgradeElement.textContent = `${upgrade.name} (${upgrade.effect} points per click, $${upgrade.cost})`;
    upgradeElement.disabled = upgrade.isBought;
  });
}

// Set initial score and points per click
scoreElement.textContent = score;

// Increase score when clickable image is clicked
clickableImage.addEventListener('click', () => {
  score += pointsPerClick;
  scoreElement.textContent = score;
});

// Generate upgrades
for (let i = 1; i <= 10; i++) {
  const upgrade = {
    name: `Upgrade ${i}`,
    cost: Math.pow(10, i),
    effect: Math.pow(2, i),
    isBought: false
  };
  upgrades.push(upgrade);
}

// Display upgrades
upgrades.forEach((upgrade, index) => {
  const upgradeElement = document.createElement('button');
  upgradeElement.id = `upgrade${index + 1}`;
  upgradeElement.textContent = `${upgrade.name} (${upgrade.effect} points per click, $${upgrade.cost})`;
  upgradeElement.disabled = upgrade.isBought;
  upgradeElement.addEventListener('click', () => {
    if (score >= upgrade.cost) {
      score -= upgrade.cost;
      scoreElement.textContent = score;
      pointsPerClick *= upgrade.effect;
      upgrade.isBought = true;
      upgradeElement.disabled = true;
    }
  });
  upgradeContainer.appendChild(upgradeElement);
});

// Upgrade button functionality
upgradeButton.addEventListener('click', () => {
  if (score >= 10) {
    score -= 10;
    scoreElement.textContent = score;
    pointsPerClick *= 2;
  }
});

// removed duplicate save function
