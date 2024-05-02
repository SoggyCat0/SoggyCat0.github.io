let score = 0;
let pointsPerClick = 1;
let upgrades = [];
let player = { score, pointsPerClick, upgrades }; // added player object

const soggycat = document.getElementById('soggycat');
const scoreElement = document.getElementById('score');
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
    upgradeElement.textContent = `${upgrade.name} (${upgrade.effect} points per click, ${upgrade.cost} SogCoins)`;
    upgradeElement.disabled = upgrade.isBought;
  });
}

// Set initial score and points per click
scoreElement.textContent = score;

// Increase score when clickable image is clicked
soggycat.addEventListener('click', () => {
  score += pointsPerClick;
  scoreElement.textContent = score;
  save(); // save game after each click
});

// Generate upgrades
for (let i = 1; i <= 8; i++) { // changed to 8, as there are 8 upgrades in the HTML
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
  upgradeElement.className = 'upgrade-button'; // added class name
  upgradeElement.id = `upgrade${index + 1}`;
  upgradeElement.textContent = `${upgrade.name} (${upgrade.effect} points per click, ${upgrade.cost} SogCoins)`;
  upgradeElement.disabled = upgrade.isBought;
  upgradeElement.addEventListener('click', () => {
    if (score >= upgrade.cost) {
      score -= upgrade.cost;
      scoreElement.textContent = score;
      pointsPerClick *= upgrade.effect;
      upgrade.isBought = true;
      upgradeElement.disabled = true; // changed to true
      save(); // save game after each upgrade purchase
    }
  });
  upgradeContainer.appendChild(upgradeElement);
});

loadGame(); // load game when script is loaded
