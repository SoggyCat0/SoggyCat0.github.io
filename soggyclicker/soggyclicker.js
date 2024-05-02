let score = 0;
let pointsPerClick = 1;
let upgrades = [];

const clickableImage = document.getElementById('clickableImage');
const scoreElement = document.getElementById('score');
const upgradeButton = document.getElementById('upgradeButton');
const upgradeContainer = document.getElementById('upgrades');

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
