function animate(time) {	
	cframe += 1;

	if (!last_rendered_time) last_rendered_time = time;
	let delta = (time-last_rendered_time);

	if (controls && camera) {
		controls.updateMovement(delta || 1, 1/(250+16));


		if (controls.isJumping) {
  camera.position.y += controls.velocity.y * delta;
  controls.velocity.y -= 0.5 * delta; // gravity
  if (controls.velocity.y <= 0) {
    controls.isJumping = false;
    controls.velocity.y = 0;
    camera.position.y = Math.max(0, Math.min(10, camera.position.y)); // ensure y position is between 0 and 10
  }
}
		
		// Apply gravity
		if (controls.isJumping) {
			camera.position.y += controls.velocity.y * delta;
			controls.velocity.y -= 0.5 * delta; // gravity
			if (controls.velocity.y <= 0) {
				controls.isJumping = false;
				controls.velocity.y = 0;
				camera.position.y = Math.floor(camera.position.y); // snap to floor
			}
		}
	};
	
	//... rest of the code remains the same...
}
